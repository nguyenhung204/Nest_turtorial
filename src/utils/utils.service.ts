import { Injectable, Scope } from '@nestjs/common';
import * as os from 'os';
@Injectable({ scope: Scope.DEFAULT })
export class UtilsService {
    getServerIp(): string {
        return 'localhost';
        const networkInterfaces = os.networkInterfaces();
    
        for (const name in networkInterfaces) {
          const interfaceInfo = networkInterfaces[name];
          for (const address of interfaceInfo) {
            if (address.family === 'IPv4' && !address.internal) {
              return address.address;
            }
          }
        }
    
        return null;
      }
}
