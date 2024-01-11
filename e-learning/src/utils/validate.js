// rules = {
//   name: [{ required: true }],
//   email: [
//     { required: true, message: "Xin vui long dien email" },
//     { regex: "email", message: "Xin vui long nhap dung email" },
//   ],
// };

// form = {
//   name: "Pham Van Kiet",
//   email: "phamvankiet@gmail.com",
// };

// errorObj = {
//   email: "Vui long nhap dung dinh dang email",
// };

const ERROR_MESSAGE = {
  required: "Vui lòng không để trống trường này",
  regexp: "Trường này không đúng định dạng:",
};

const REGREX = {
  email: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  phone: /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
};

export const validate = (rules, forms) => {
  const errorObject = {};
  for (let name in rules) {
    for (let rule of rules[name]) {
      if (rule.required) {
        if (!forms[name]?.trim()) {
          errorObject[name] = rule.message || ERROR_MESSAGE.required;
        }
      }

      // if (rule.regexp && forms[name]) {
      //     let regexp = rule.regexp;
      //     if (regexp in REGEXP) {
      //         regexp = REGEXP[regexp]
      //     } else if (!(regexp instanceof RegExp)) {
      //         regexp = new RegExp()
      //     }
      //     if (!regexp.test(forms[name])) {
      //         errorObject[name] = rule.message || ERROR_MESSAGE.regexp;
      //     }
      // }

      if (rule.regrex && forms[name]) {
        let pattern = "";
        if (rule.regrex in REGREX) {
          pattern = REGREX[rule.regrex];
        } else if (rule.regrex instanceof RegExp) {
          pattern = rule.regrex;
        } else {
          pattern = new RegExp(rule.regrex, "gi");
        }
        // check regrex
        if (!pattern.test(forms[name])) {
          errorObject[name] = rule.message || "Vui lòng nhập đúng định dạng";
          break;
        }
      }

      if (typeof rule === "function") {
        const message = rule(forms[name], forms);
        console.log("message", message);
        if (!!message) {
          errorObject[name] = message || "Dữ liệu nhập sai yêu cầu";
          break;
        }
      }
    }
  }
  return errorObject;
};

export const requireRule = (message) => {
  return {
    required: true,
    message,
  };
};

export const regrexRule = (regrex, message) => {
  return {
    regrex,
    message,
  };
};
