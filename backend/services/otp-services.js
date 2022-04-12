import crypto from "crypto";
import hashService from "./hash-services.js";
class OtpService {
  async generateOtp() {
    const otp = crypto.randomInt(1000, 9999);
    return otp;
  }

  verifyOtp(hashedOtp, data) {
    let checkHash = hashService.hashOtp(data);
    return checkHash === hashedOtp;
  }
}

export default new OtpService();
