// Password strength validation
export const checkPasswordStrength = (password) => {
  const requirements = [
    { regex: /.{8,}/, text: "At least 8 characters", met: false },
    { regex: /[0-9]/, text: "At least one number", met: false },
    { regex: /[a-z]/, text: "At least one lowercase letter", met: false },
    { regex: /[A-Z]/, text: "At least one uppercase letter", met: false },
    { regex: /[^A-Za-z0-9]/, text: "At least one special character", met: false }
  ];

  requirements.forEach(req => {
    req.met = req.regex.test(password);
  });

  const strength = requirements.filter(req => req.met).length;
  let strengthText = "";
  let strengthColor = "";

  if (strength === 0) {
    strengthText = "Very Weak";
    strengthColor = "text-red-500";
  } else if (strength <= 2) {
    strengthText = "Weak";
    strengthColor = "text-orange-500";
  } else if (strength <= 3) {
    strengthText = "Fair";
    strengthColor = "text-yellow-500";
  } else if (strength <= 4) {
    strengthText = "Good";
    strengthColor = "text-blue-500";
  } else {
    strengthText = "Strong";
    strengthColor = "text-green-500";
  }

  return {
    requirements,
    strength,
    strengthText,
    strengthColor,
    isStrong: strength >= 4 // Requires at least 4 criteria to be met
  };
};

// Email validation
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const formatMessageTime = (date) => {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};