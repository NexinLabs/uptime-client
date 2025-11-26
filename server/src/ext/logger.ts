import { debug} from '@/config';

const colors = {
    white: "\x1b[37m",
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    dim: "\x1b[2m",
    italic: "\x1b[3m",
    underline: "\x1b[4m",
    inverse: "\x1b[7m",
    hidden: "\x1b[8m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
}


class LoggerLevel {
    static DEBUG = 0;
    static INFO = 1;
    static WARN = 2;
    static ERROR = 3;
    static FATAL = 4;
}


class LogColors {
    static debug  = `${colors.bright}${colors.blue}[DEBUG]${colors.reset}`;
    static info   = `${colors.bright}${colors.green}[INFO]${colors.reset}`;
    static warn   = `${colors.bright}${colors.yellow}[WARN]${colors.reset}`;
    static error  = `${colors.bright}${colors.red}[ERROR]${colors.reset}`;
    static fatal  = `${colors.bright}${colors.red}[FATAL]${colors.reset}`;
}

export default class Logger {
    levels = LoggerLevel;

    // Default log level is DEBUG 
    level: number = debug.logLevel;

    static instance = new Logger();

    private constructor() {
        // Private constructor to prevent instantiation
    }

    timestamp() {
        const now = new Date();
        return `${colors.bright}${colors.magenta}[${now.toISOString()}]${colors.reset}`;
    }

    format(label: keyof typeof LogColors, ...args: any[]) {
        return `${this.timestamp()} ${LogColors[label]} : ${args.join(" ")}`;
    }

    async debug(...args: any[]) {
        if (this.level <= this.levels.DEBUG) {
            console.debug(this.format("debug", ...args));
        }
    }
    async info(...args: any[]) {
        if (this.level <= this.levels.INFO) {
            console.info(this.format("info", ...args));
        }
    }
    async warn(...args: any[]) {
        if (this.level <= this.levels.WARN) {
            console.warn(this.format("warn", ...args));
        }
    }
    async error(...args: any[]) {
        if (this.level <= this.levels.ERROR) {
            console.error(this.format("error", ...args));
        }
    }
    async fatal(...args: any[]) {
        if (this.level <= this.levels.FATAL) {
            console.error(this.format("fatal", ...args));
        }
    }
    async setLevel(level: number) {
        if (Object.values(LoggerLevel).includes(level)) {
            this.level = level;
        }
        else {
            throw new Error("Invalid debug level");
        }
    }
}
const logger = Logger.instance;
export { Logger, LoggerLevel, logger };

// Usage example
// const logger = Logger.instance;
// logger.setLevel(LoggerLevel.INFO);
// logger.debug("This is a debug message"); // Will not log
// logger.info("This is an info message"); // Will log
// logger.warn("This is a warning message"); // Will log
// logger.error("This is an error message"); // Will log
// logger.fatal("This is a fatal message"); // Will log