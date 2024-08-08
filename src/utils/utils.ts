import { PolicyType, PolicyStatus, ClaimStatus } from "../models/Status";

export class UtilityService {
  orderNamingSeries = (): string => {
    const currentYear = new Date().getFullYear().toString();
    let randomDigits = "";
    const digits = "0123456789";
  
    // Generate 6 random digits
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * digits.length);
      randomDigits += digits[randomIndex];
    }
  
    // Construct the order number
    const policyNumber = `O-${currentYear}-${randomDigits}`;
  
    return policyNumber;
  };
  

  calculateAge = (dateOfBirth: string): number => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  isAbove18 = (dateOfBirth: string): boolean => {
    const age = this.calculateAge(dateOfBirth);
    return age >= 18;
  };

 
}
