import winston from 'winston';
import path from 'path';
import { fileURLToPath } from 'url';
import config from '#config/index.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// 로그 파일 저장 경로 설정
const logDirectory = path.join(__dirname, '../../logs');

// 로그 파일 전송 설정
const fileTransportError = new winston.transports.File({
  filename: path.join(logDirectory, 'error.log'),
  level: 'error',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
});

const fileTransportAccess = new winston.transports.File({
  filename: path.join(logDirectory, 'access.log'),
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.json()
  ),
});

// 콘솔 전송 설정
const consoleTransport = new winston.transports.Console({
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.printf((info) => `${info.timestamp} [${info.level}]: ${info.message}`)
  ),
});

const LoggerInstance = winston.createLogger({
  level: config.logs.level,
  levels: winston.config.npm.levels,
  transports: [consoleTransport, fileTransportError, fileTransportAccess],
});

export default LoggerInstance;

//우선 순위 순 level을 지정하면 해당단계 이하는 출력안됨
// error: 심각한 문제를 나타냅니다.
// warn: 경고 메시지를 나타냅니다.
// info: 일반적인 정보를 나타냅니다.
// http: HTTP 요청 관련 정보를 나타냅니다.
// verbose: 상세한 디버그 정보를 나타냅니다.
// debug: 디버깅 정보를 나타냅니다.
// silly: 매우 상세한 디버깅 정보를 나타냅니다.