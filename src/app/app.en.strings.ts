export const enStrings = {
  data: {
    biometricLogin: {
      prompt: {
        title: "Authenticate to Login",
        cancel: "Cancel",
      },
      error: {
        notFound:
          "Could not find your data. Please try logging in with your password.",
        authorization:
          "Could not authorize your biometric login. Please try logging in with your password.",
        unknown: "Something went wrong. Please try again.",
      },
    },
  },
  authentication: {
    otpVerification: {
      title: "Email Verification",
      subtitle: "Verification code has been sent to",
      resendCode: "Code Sent. Resend Code in",
      button: {
        submit: "Submit",
      },
    },
    passwordRecover: {
      title: "Recovery Password",
      subtitle: "Enter your email address to reset password.",
      field: {
        email: {
          label: "Email Address",
          placeholder: "Enter your email",
        },
      },
      button: {
        resetPassword: "Reset Password",
      },
    },
    UserRole: {
      title: "Select User Role",
      subtitle: "Choose one.",
      card: {
        text: {
          needStorage: "I need a Storage",
          storageOwner: "Storage Owner",
        },
      },
      button: {
        next: "Next",
      },
    },
    newPassword: {
      title: "Set New Password",
      subtitle: "Create strong and secured new password.",
      field: {
        code: {
          label: "Verification Code",
          placeholder: "Enter the verification code",
        },
        password: {
          label: "Password",
          placeholder: "Enter your new password",
        },
        confirmPassword: {
          label: "Confirm Password",
          placeholder: "Re-enter your new password",
        },
      },
      button: {
        savePassword: "Save Password",
      },
    },
    register: {
      title: "Register",
      subtitle: "Seems you are new here, Let's set up your profile.",
      checkAccount: "Already have an account ?",
      termsAndConditions: "I agree to Terms of Use",
      privacyPolicy: "I agree to privacy policy",
      field: {
        FirstName: {
          label: "First Name",
          placeholder: "Enter your first name",
        },
        LastName: {
          label: "Last Name",
          placeholder: "Enter your last name",
        },
        mobile_number: {
          label: "Mobile Number",
          placeholder: "Enter your mobile number",
        },
        email: {
          label: "Email Address",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          placeholder: "Enter your password",
        },
        confirmPassword: {
          label: "Confirm Password",
          placeholder: "Re-enter your password",
        },
      },
      button: {
        next: "Next",
        signIn: "Sign In",
        register: "Register",
        termsAndConditions: "Terms & Conditions",
      },
    },
    splash: {
      title: "Storage Space",
      welcomeMessage: "Hello, Welcome!",
      checkAccount: "Don't have an account ?",
      button: {
        login: "Login",
        signUp: "Sign Up",
      },
    },
    login: {
      title: "Login",
      logoAlt: "App Logo",
      pageTitle: "Login to Dashboard",
      welcomeBack: "Welcome back, you've been missed!",
      checkAccount: "Don't have an account ?",
      rememberMe: "Remember me",
      field: {
        email: {
          label: "Email Address",
          placeholder: "Enter your email",
          required: "Email is required",
        },
        password: {
          label: "Password",
          placeholder: "Enter your password",
          required: "Password is required",
        },
      },
      button: {
        login: "Login",
        signUp: "Sign Up",
        register: "Register",
        forgotPassword: "Forgot Password?",
      },
    },
  },
  component: {
    dataTable: {
      emptyMessage: "No data available",
    },
    defaultCaptions: {
      required: "This field is required",
      cnpj: "Invalid CNPJ",
      cpf: "Invalid CPF",
      email: "Invalid email",
      phone: "Invalid phone",
      zipCode: "Invalid zipcode",
    },
    error: {
      cleanCacheError:
        "Something went wrong while cleaning the video cache. Please try again later.",
      requestError: "Oops! Something went wrong. Please try again later.",
      loginExpired: "Your session has expired. Please log in again.",
      invalidCredentials: "Login failed, Invalid credentials",
      addressNotFound:
        "Address not found. Please check the address details and try nearest place.",
    },
  },
  cameraErrors: {
    cameraNotAvailable: "Camera not available",
    permissionRequired: "Permission is required to access camera",
    invalidImageType: "Invalid image type",
  },
  admin: {
    sidebar: {
      title: "Admin Panel",
      nav: {
        dashboard: "Dashboard",
        users: "Users",
        settings: "Settings",
      },
      logout: "Logout",
    },
    dashboard: {
      title: "Dashboard",
      addUser: "Add User",
      recentUsers: "Recent Users",
      stats: {
        totalUsers: "Total Users",
        totalUsersTrend: "+12% this month",
        activeAgents: "Active Agents",
        activeAgentsTrend: "+5% today",
        openTickets: "Open Tickets",
        openTicketsTrend: "-8% this week",
        tasksCompleted: "Tasks Completed",
        tasksCompletedTrend: "+2% this week",
      },
      table: {
        columns: {
          name: "Name",
          role: "Role",
          skills: "Skills",
          status: "Status",
          joined: "Joined",
        },
      },
    },
    users: {
      title: "Users",
      addUser: "Add User",
      searchPlaceholder: "Search by name, email or role…",
      emptyMessage: "No users match your search.",
      table: {
        columns: {
          name: "Name",
          role: "Role",
          skills: "Skills",
          status: "Status",
          joined: "Joined",
        },
      },
    },
    settings: {
      title: "Settings",
      profile: {
        title: "Profile",
        subtitle: "Update your account display name and email address.",
        field: {
          name: {
            label: "Full Name",
            placeholder: "Enter your full name",
            required: "Name is required",
          },
          email: {
            label: "Email",
            placeholder: "Enter your email",
            required: "Email is required",
          },
        },
        button: {
          save: "Save Changes",
        },
        success: "Profile updated successfully.",
      },
      password: {
        title: "Change Password",
        subtitle: "Use a strong password you don't use elsewhere.",
        field: {
          current: {
            label: "Current Password",
            placeholder: "Enter current password",
            required: "Current password is required",
          },
          new: {
            label: "New Password",
            placeholder: "Enter new password",
            required: "New password is required",
          },
        },
        button: {
          change: "Change Password",
        },
        success: "Password changed successfully.",
      },
    },
  },
};
