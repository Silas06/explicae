// Required
function required(value: string | number) {
  // If is a string
  if (typeof value === "string" && value.trim() === "") {
    return "Campo é obrigatório";
  }

  // If is a number
  if (typeof value === "number" && !value) {
    return "Campo é obrigatório";
  }

  // If is a boolean
  if (typeof value === "boolean" && !value) {
    return "Campo é obrigatório";
  }

  // If is a array
  if (Array.isArray(value) && value.length === 0) {
    return "Campo é obrigatório";
  }

  // Else
  if (!value) {
    return "Campo é obrigatório";
  }

  return true;
}

// Min Length
function minLength(value: any, length: number) {
  if (value.length < length) {
    return `Este campo deve ter pelo menos ${length} caracteres`;
  }
  return true;
}

// Max Length
function maxLength(value: any, length: number) {
  if (!value) return true;
  if (value.length > length) {
    return `Este campo deve ter no máximo ${length} caracteres`;
  }
  return true;
}

// Between value
function between(value: any, min: number, max: number) {
  if (value < min || value > max) {
    return `Este campo deve ter um valor entre ${min} e ${max}`;
  }
  return true;
}

// Min Value
function minValue(value: any, min: number) {
  if (value < min) {
    return `Este campo deve ter um valor maior ou igual a ${min}`;
  }
  return true;
}

// Max Value
function maxValue(value: any, max: number) {
  if (value > max) {
    return `Este campo deve ter um valor menor ou igual a ${max}`;
  }
  return true;
}

function email(field: string) {
  if (!field) return true
  const usuario = field.substring(0, field.indexOf("@"));
  const dominio = field.substring(field.indexOf("@") + 1, field.length);

  if (
    usuario.length >= 1 &&
    dominio.length >= 3 &&
    usuario.search("@") == -1 &&
    dominio.search("@") == -1 &&
    usuario.search(" ") == -1 &&
    dominio.search(" ") == -1 &&
    dominio.search(".") != -1 &&
    dominio.indexOf(".") >= 1 &&
    dominio.lastIndexOf(".") < dominio.length - 1
  ) {
    return true;
  } else {
    return "E-mail inválido";
  }
}

function password(password: string, [target]: any) {
  if (password !== target) {
    return 'A confirmação de senha não pode ser diferente.';
  }
  return true;
}

function passwordSeguro(password: string) {
  const especial = /[-_@!.;,><=#$%&*()+]/;
  const lowerCaseLetters = /[a-z]/g;
  const upperCaseLetters = /[A-Z]/g;
  const numbers = /[0-9]/g;
  let valid = false
  if (
    password.match(lowerCaseLetters) &&
    password.match(upperCaseLetters) &&
    password.match(numbers) &&
    password.match(especial) &&
    password.length >= 8
  ) {
    valid = true;
  } else {
    valid = false;
  }

  if (!valid) return "A senha deve conter letra maiúscula, letra minúscula, número, caractere especial e no mínimo 8 caracteres";

  return true;
}

export {
  password,
  required,
  minLength,
  maxLength,
  between,
  minValue,
  maxValue,
  passwordSeguro,
  email,
}
