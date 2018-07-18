# Error display

## `validity.showErrorMessages`
The method `validity.showErrorMessages`  can be used to show to topmost error message in a HTML format of this format by toggling the `hidden` CSS class

``` 
<div class="error-messages-container">
   <div class="hidden" data-display-on="valueMissing">
      This field is required
   </div>
   <div class="hidden" data-display-on="customValidationMessage">
      Custom validation message
   </div>
   <div class="hidden" data-display-on="tooLong tooShort">
      The value is too short or too long
   </div>
</div>
   
```

The "`.error-messages-container`" class must be selected as the target container
The 2nd argument is an array of strings which will display the first match of the value `data-display-on` (including space-separated values)
