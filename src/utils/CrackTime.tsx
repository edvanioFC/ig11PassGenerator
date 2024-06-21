// Function to estimate crack time based on password strength
const CrackTime = (password: string): string => {
  // Define the average rate of password guesses per second 
  const guessesPerSecond = 1e6; // 1 million guesses per second

  // Calculate the entropy of the password
  const entropy = calculateEntropy(password);

  // Calculate the number of possible combinations
  const combinations = Math.pow(2, entropy);

  // Calculate the crack time in seconds
  const crackTimeSeconds = combinations / guessesPerSecond;

  // Convert crack time to appropriate units (seconds, minutes, hours)
  return formatCrackTime(crackTimeSeconds);
};

//calculate entropy of the password
const calculateEntropy = (password: string): number => {
  const bitsPerCharacter = 6;
  return password.length * bitsPerCharacter;
};

const formatCrackTime = (crackTimeSeconds: number): string => {
    if (crackTimeSeconds < 1) {
      return "Less than a second";
    } else if (crackTimeSeconds < 60) {
      return `${Math.round(crackTimeSeconds)} seconds`;
    } else if (crackTimeSeconds < 3600) {
      const minutes = Math.floor(crackTimeSeconds / 60);
      return `${minutes} minute${minutes !== 1 ? "s" : ""}`;
    } else if (crackTimeSeconds < 86400) {
      const hours = Math.floor(crackTimeSeconds / 3600);
      return `${hours} hour${hours !== 1 ? "s" : ""}`;
    } else if (crackTimeSeconds < 2592000) { // Less than 30 days
      const days = Math.floor(crackTimeSeconds / 86400);
      return `${days} day${days !== 1 ? "s" : ""}`;
    } else if (crackTimeSeconds < 31536000) { // Less than a year
      const months = Math.floor(crackTimeSeconds / 2592000);
      return `${months} month${months !== 1 ? "s" : ""}`;
    } else if (crackTimeSeconds < 946080000) { // Less than 30 years
      const years = Math.floor(crackTimeSeconds / 31536000);
      return `${years} year${years !== 1 ? "s" : ""}`;
    } else if (crackTimeSeconds < 3153600000) { // Less than a century
      const centuries = Math.floor(crackTimeSeconds / 946080000);
      return `${centuries} century${centuries !== 1 ? "ies" : "y"}`;
    } else {
      return "Many centuries";
    }
  };

export default CrackTime;
