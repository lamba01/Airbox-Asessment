const bcrypt = require("bcryptjs");

const enteredPassword = "john";
const storedHash = "$2a$10$WT40GFWBEXCPtJegVCM5Au2VX950yuaefz6w6yhgl17Vjj0.1TSM.";

bcrypt.compare(enteredPassword, storedHash).then((isMatch) => {
    console.log("Password Match:", isMatch ? "✅ Matched!" : "❌ Not Matched!");
});

// const bcrypt = require("bcryptjs");

// const password = "john";

// bcrypt.hash(password, 10).then((hash) => {
//     console.log("Newly Hashed Password:", hash);
// });
