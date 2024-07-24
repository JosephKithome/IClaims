import { PolicyType, PolicyStatus, ClaimStatus } from "../models/Status";

export class UtilityService {
  policyNumberGenerator = (): string => {
    let accountNumber = "";
    const digits = "0123456789";

    // Generate 12 random digits
    for (let i = 0; i < 12; i++) {
      const randomIndex = Math.floor(Math.random() * digits.length);
      accountNumber += digits[randomIndex];
    }

    return accountNumber;
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

  isAllowedPolicyStatus = (status: string): boolean => {
    console.log(status);
    for (const key of Object.keys(PolicyStatus)) {
        const value = PolicyStatus[key as keyof typeof PolicyStatus];
        console.log(key, value);
        const upperStatus = value.toLocaleLowerCase().includes(status) ||  value.toUpperCase().includes(status) 
        console.log("STtust status: " + upperStatus);   
        return upperStatus;
    }
    return false;
  };
  isAllowedPolicyType = (type: string): boolean => {
    console.log("isAllowedPolicy", type);
    let st = false;
    for (const key of Object.keys(PolicyType)) {
        const value = PolicyType[key as keyof typeof PolicyType];
        console.log(key, value);
        const upperStatus =  value.toLocaleLowerCase().includes(type) ||  value.toUpperCase().includes(type) 
        console.log(upperStatus)   
        return upperStatus;
    }
    return false;
  };

  isAllowedClaimStatus = (type: string): boolean => {
    console.log("isAllowedPolicy", type);
    let st = false;
    for (const key of Object.keys(ClaimStatus)) {
        const value = ClaimStatus[key as keyof typeof ClaimStatus];
        console.log(key, value);
        const upperStatus =  value.toLocaleLowerCase().includes(type) ||  value.toUpperCase().includes(type) 
        console.log(upperStatus)   
        return upperStatus;
    }
    return false;
  };
}
