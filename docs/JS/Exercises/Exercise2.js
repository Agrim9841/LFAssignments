// Define an object containing information about yourself. 
// The object needs to include 'name', 'address', 'emails', 'interests' 
// and 'education'. The 'education' key needs to be an array of objects 
// containing keys 'name' and 'enrolledDate'.

// Using the object defined previously iterate over the 'education' 
// key and print a list of output in the console as follows:

// Name: ABC School of Schoolery, Date: 2000
// Name: BCD School of Trickery, Date: 2006

let person = {
    name: "Agrim Das Tuladhar",
    address: "Dallu, Kathmandu",
    emails: ["agrim.tuladhar@gmail.com"],
    interests: ["sketching", "anime"],
    education: [
        {
            name: "Green Peace School",
            enrolledDate: "2006"
        },
        {
            name: "NIST",
            enrolledDate: "20014"
        },
        {
            name: "NCCS College",
            enrolledDate: "2016"
        }
    ]
}


console.log("Output for exercise 2:")
person.education.forEach((item)=>{
    console.log("Name: "+item.name+", Date: "+item.enrolledDate);
})