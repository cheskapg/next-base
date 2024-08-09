
export const removeNullAttributes = (obj: {
    [key: string]: any;
  }): {
    [key: string]: any;
  } => {
    // Create a new object to avoid mutating the original object
    const newObj: { [key: string]: any } = {};
    // Iterate over the object's own properties
    for (const key in obj) {
      if (obj.hasOwnProperty(key) && obj[key] !== null) {
        newObj[key] = obj[key];
      }
    }
    return newObj;
  };
  
  export function formatPhoneNumber(value: string): string {
    if (!value) return value;
  
    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;
  
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
    }
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, phoneNumber.length)}`;
  }

 export function loadUploadedImage (event: any) {
    var input = event.target;
    var file = input.files[0];
    var type = file.type;
    var output = document.getElementById(event.target.id + "Image");
    if(output!=null)
    {
      output.setAttribute("src",URL.createObjectURL(event.target.files[0]));
  }
    console.log(output);
  };
  
  export function calculateAge(value:string) {
    const today = new Date();
    const birthday = new Date(value);
    let age = today.getFullYear() - birthday.getFullYear();
    const monthDifference = today.getMonth() - birthday.getMonth();
    const dayDifference = today.getDate() - birthday.getDate();
  
    // If the birthday hasn't occurred yet this year, subtract one from age
    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      age--;
    }
  
    return age;
  }

export function removeNonNumericChars(
    value: string | null | undefined,
  ): string | null | undefined {
    if (!value) return value;
    const cleanStr = value.replace(/[^\d]/g, '');
    return cleanStr;
  }