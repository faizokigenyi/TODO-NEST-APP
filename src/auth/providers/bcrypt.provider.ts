import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { HashingProvider } from './hashing.provider';

@Injectable()
export class BcryptProvider implements HashingProvider {
  public async hashPassword(data: string | Buffer): Promise<string> {
    // Let bcrypt use the default salt rounds (usually 10)
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(data, salt);
  }

  public async comparePassword(
    data: string | Buffer,
    encrypted: string,
  ): Promise<boolean> {
    const password = 'mypassword1234';
    const hash = await bcrypt.hash(password, 10);
    console.log('Hash:', hash);
    const result = await bcrypt.compare(password, hash);
    console.log('Match:', result); // should be true
    return bcrypt.compare(data, encrypted);
  }
}
