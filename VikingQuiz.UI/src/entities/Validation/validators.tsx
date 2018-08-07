const signUpValidator =  function(inputs: any, validationRules: any, id: string, funcs: any) {
   const rules = validationRules[id];
   const inputFieldsValueCopy = funcs.getCopyOfInputs(inputs);
   const inputItem = funcs.getItemById(id, inputs);
   const item = inputFieldsValueCopy[inputItem.index]

   const confPass = funcs.getItemById("user-confpass", inputs).item;
   if (id === 'user-password') {
      if (confPass.value) {
         signUpValidator(inputs, validationRules, 'user-confpass', funcs);
      }
   }

   for (const rule of rules) {
      if (!rule.isValid(item.value, inputs, funcs)) {

         funcs.changeErrorMessageOf(id, rule.errorMessage);
         return false;
      }
   }

   funcs.changeErrorMessageOf(id, "");
   return true;
}

const loginValidator = function(inputs: any, validationRules: any, id: string, funcs: any) {
   const rules = validationRules[id];
   const inputFieldsValueCopy = funcs.getCopyOfInputs(inputs);
   const inputItem = funcs.getItemById(id, inputs);
   const item = inputFieldsValueCopy[inputItem.index]


   for (const rule of rules) {
      if (!rule.isValid(item.value, inputs, funcs)) {
         funcs.changeErrorMessageOf(id, rule.errorMessage);
         return false;
      }
   }

   funcs.changeErrorMessageOf(id, "");
   return true;
}

const changePasswordValidator =  function(inputs: any, validationRules: any, id: string, funcs: any) {
    const rules = validationRules[id];
    const inputFieldsValueCopy = funcs.getCopyOfInputs(inputs);
    const inputItem = funcs.getItemById(id, inputs);
    const item = inputFieldsValueCopy[inputItem.index]
 
    const confirmPasswordField = funcs.getItemById("confirm-password", inputs).item;
    if (id === 'password') {
       if (confirmPasswordField.value) {
          signUpValidator(inputs, validationRules, 'confirm-password', funcs);
       }
    }
 
    for (const rule of rules) {
       if (!rule.isValid(item.value, inputs, funcs)) {
 
          funcs.changeErrorMessageOf(id, rule.errorMessage);
          return false;
       }
    }
 
    funcs.changeErrorMessageOf(id, "");
    return true;
 }

export { signUpValidator, loginValidator, changePasswordValidator};
