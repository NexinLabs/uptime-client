# Service Monitor Implementation

## Overview
The Service Monitor is an automated system that continuously monitors the health and availability of registered services by sending HTTP requests to their endpoints at configured intervals.

## Features

### 1. **Automatic Service Monitoring**
- Fetches all active services from the database on initialization
- Monitors services based on their configured delay intervals
- Automatically adjusts scheduling based on last run time

### 2. **HTTP Request Handling**
- Supports GET, POST, and HEAD HTTP methods
- Configurable headers and request body (for POST requests)
- 30-second timeout for each request
- Response time tracking

### 3. **Error Detection & Logging**
- Detects HTTP error codes (4xx, 5xx)
- Catches network errors and timeouts
- Creates detailed log records for both successes and failures
- Stores last 100 log records per service

### 4. **Smart Scheduling**
- Calculates optimal delay based on last run time
- Prevents overlapping checks
- Automatically reschedules after each check
- Updates service lastrun timestamp

### 5. **Dynamic Management**
- Add new services to monitoring on creation
- Update monitoring configuration on service updates
- Remove services from monitoring on deletion
- Graceful shutdown handling

## Architecture

### Core Components

#### ServiceMonitor Class (`server/src/utils/services/monitor.ts`)
Main monitoring engine with the following methods:

- **`initialize()`** - Starts the monitoring system
- **`fetchServices()`** - Retrieves active services from database
- **`scheduleServiceCheck(service)`** - Schedules the next check for a service
- **`checkService(service)`** - Performs health check on a service
- **`addService(serviceId)`** - Adds a service to monitoring
- **`updateService(serviceId)`** - Updates service monitoring configuration
- **`removeService(serviceId)`** - Removes a service from monitoring
- **`shutdown()`** - Gracefully stops all monitoring
- **`getStatus()`** - Returns current monitoring status

### Data Models

#### Service Model
```typescript
{
  _id: ObjectId
  status: number          // 0=down, 1=up, 2=pending
  owner: ObjectId         // User who owns the service
  name: string           // Service name
  url: string            // Endpoint to monitor
  method: 'GET'|'POST'|'HEAD'  // HTTP method
  headers: object        // Request headers
  body: object          // Request body (for POST)
  delay: number         // Check interval in seconds (default: 60)
  lastrun: Date         // Last check timestamp
}
```

#### Log Model
```typescript
{
  service: ObjectId      // Reference to service
  records: [
    {
      method: string           // HTTP method used
      level: 'info'|'warning'|'error'  // Log level
      status_code: number      // HTTP status code
      message: string          // Log message
      meta: {
        url: string
        response_time_ms: number
        timestamp: Date
      }
    }
  ]
}
```

## Integration Points

### 1. Application Startup (`server/src/core/app.ts`)
```typescript
// Initialize monitor after database connection
await ServiceMonitor.initialize();

// Graceful shutdown on SIGTERM/SIGINT
process.on('SIGTERM', () => {
  ServiceMonitor.shutdown();
  process.exit(0);
});
```

### 2. Service Controller (`server/src/controllers/services.ts`)
- **Create Service** - Automatically adds to monitoring
- **Update Service** - Updates monitoring configuration
- **Delete Service** - Removes from monitoring

### 3. New API Endpoint
- **GET /services/:serviceId/logs** - Retrieves detailed logs for a specific service

## Monitoring Flow

```
1. Server Start
   ↓
2. Database Connection
   ↓
3. ServiceMonitor.initialize()
   ↓
4. Fetch All Active Services
   ↓
5. For Each Service:
   - Calculate next check time based on delay and lastrun
   - Schedule check using setTimeout
   ↓
6. On Scheduled Time:
   - Send HTTP request to service endpoint
   - Measure response time
   - Check status code
   - Update service lastrun timestamp
   ↓
7. Log Result:
   - Success: Log with 'info' level
   - Error: Log with 'error' level
   ↓
8. Reschedule Next Check
   - Fetch latest service config
   - Calculate next delay
   - Schedule new check
```

## Error Handling

### Network Errors
- Connection refused
- DNS resolution failures
- Connection timeouts (408)
- All logged with status code 0 and error message

### HTTP Errors
- 4xx Client Errors
- 5xx Server Errors
- All logged with actual status code and status text

### Database Errors
- Service not found - removes from monitoring
- Update failures - uses cached service data for rescheduling
- Log creation failures - logged but doesn't stop monitoring

## Configuration

### Service Delay
Each service has a configurable `delay` field (in seconds):
- Default: 60 seconds
- Minimum: No enforced minimum (can be 1 second)
- Adjusted automatically if service was recently checked

### Log Retention
- Keeps last 100 records per service
- Automatically prunes older records using MongoDB's `$slice` operator

### Request Timeout
- Fixed at 30 seconds per request
- Configurable in `monitor.ts` if needed

## Usage Examples

### Create and Monitor a Service
```typescript
POST /services
{
  "name": "My API",
  "url": "https://api.example.com/health",
  "method": "GET",
  "delay": 300,  // Check every 5 minutes
  "headers": {
    "Authorization": "Bearer token123"
  }
}
// Service is automatically added to monitoring
```

### Update Service Configuration
```typescript
PUT /services/:serviceId
{
  "delay": 60  // Change to check every minute
}
// Monitoring is automatically updated with new config
```

### Get Service Logs
```typescript
GET /services/:serviceId/logs?limit=50
// Returns last 50 log entries for the service
```

### Check Monitor Status
```typescript
const status = ServiceMonitor.getStatus();
// { isInitialized: true, activeServices: 15 }
```

## Performance Considerations

### Memory Usage
- Each scheduled check uses one setTimeout
- Minimal memory per service (~few KB)
- Map structure for O(1) lookups

### CPU Usage
- Asynchronous operations don't block
- Each check runs in its own async context
- No busy waiting or polling

### Database Impact
- One query per service check
- Batch operations for log updates
- Indexed queries for optimal performance

### Scalability
- Supports hundreds of services on a single instance
- For thousands of services, consider:
  - Distributed monitoring across multiple servers
  - Service sharding by user or region
  - Dedicated monitoring workers

## Monitoring Best Practices

1. **Set Appropriate Delays**
   - High-traffic services: 30-60 seconds
   - Low-traffic services: 300-600 seconds
   - Critical services: 10-30 seconds

2. **Use HEAD Requests**
   - Faster than GET
   - Lower bandwidth usage
   - Good for simple health checks

3. **Configure Timeouts**
   - Match service's expected response time
   - Account for network latency
   - Balance between false negatives and resource usage

4. **Monitor the Monitor**
   - Check ServiceMonitor.getStatus() periodically
   - Alert if monitoring stops
   - Log initialization and shutdown events

## Troubleshooting

### Service Not Being Monitored
1. Check if service status is >= 0
2. Verify ServiceMonitor is initialized
3. Check logs for initialization errors
4. Verify service exists in database

### Logs Not Being Created
1. Check database connection
2. Verify Log model is properly registered
3. Check for permission issues
4. Verify service._id is valid

### Checks Not Running on Schedule
1. Check service.delay configuration
2. Verify service.lastrun is being updated
3. Check for timeout errors
4. Review server logs for errors

## Future Enhancements

- [ ] Add webhook notifications for failures
- [ ] Implement circuit breaker pattern
- [ ] Add retry logic with exponential backoff
- [ ] Support for custom success criteria
- [ ] Dashboard for real-time monitoring status
- [ ] Alerting thresholds (e.g., 3 consecutive failures)
- [ ] Multi-region monitoring
- [ ] SSL certificate expiration checks
- [ ] DNS health checks
- [ ] TCP/UDP port monitoring
