const generate = document.getElementById('gen-btn');
const passwordOne = document.getElementById('pass1');
const passwordTwo = document.getElementById('pass2');

const characters = ["A","B","C","D","E","F","G","H","I","J","K",
    "L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
    "a","b","c","d","e","f","g","h","i","j","k","l","m","n","o",
    "p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", 
    "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%",
    "^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",
    ":",";","<",">",".","?","/"];

    // generates a single password
const generatePassword = () => {
    const passwordLength = 12;
    let password = "";
    for (let i = 0; i < passwordLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }
   
    return password;
}
// store the single password function in a variable 
const myPassword = generatePassword;

// Main function that generates two passwords and displays them in the empty buttons
const generateTwoPasswords = () => {
    const password1 = myPassword();
    const password2 = myPassword();

    // displays the generated passwords in the empty buttons
    passwordOne.textContent = password1;
    passwordTwo.textContent = password2;

    // Add click functionality for user to copy passwords
    passwordOne.onclick = () => copyToClipboard(password1);
    passwordTwo.onclick = () => copyToClipboard(password2);
}

// function for user to copy password to clipboard
const copyToClipboard = async (password) => {
    try {
        await navigator.clipboard.writeText(password);
        console.log('password copied to clipboard!');
        alert('Password is copied to clipboard!');
    } catch (err) {
        console.error('Failed to copy password: ', err);
        alert('Could not copy password to clipboard. Please manually copy: ' + password);
    }
}
