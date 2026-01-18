const dummyAlumni = [
    {
        id: 1,
        name: "Rahul Sharma",
        profilePic: "https://i.pravatar.cc/150?img=1",
        currentCompany: "Google",
        role: "Senior Software Engineer",
        location: "Bangalore",
        pastCollege: "Thadomal Shahani Engineering College",
        yearsOfExperience: 5,
        skills: ["React", "Node.js", "Python"],
        industry: "Technology",
        linkedinUrl: "https://linkedin.com/in/rahul",
    },
    {
        id: 2,
        name: "Priya Patel",
        profilePic: "https://i.pravatar.cc/150?img=2",
        currentCompany: "Microsoft",
        role: "Product Manager",
        location: "Mumbai",
        pastCollege: "BITS Pilani",
        yearsOfExperience: 3,
        skills: ["Product Management", "Agile", "SQL"],
        industry: "Technology",
        linkedinUrl: "https://linkedin.com/in/priya",
    },
];

const indianNames = [
    "Amit Verma",
    "Rohit Gupta",
    "Sneha Reddy",
    "Anjali Singh",
    "Vikram Iyer",
    "Manish Malhotra",
    "Kavita Deshmukh",
    "Rajesh Khanna",
    "Neha Mehta",
    "Suresh Raina",
    "Ramesh Kumar",
    "Deepika Joshi",
    "Arjun Nair",
    "Pooja Sharma",
    "Varun Batra",
    "Sanjay Rao",
    "Alok Mishra",
    "Swati Saxena",
    "Nidhi Kaur",
    "Tushar Choudhary",
];

const companies = [
    "Google",
    "Microsoft",
    "Amazon",
    "Meta",
    "Apple",
    "IBM",
    "Infosys",
    "TCS",
    "Wipro",
    "Oracle",
];
const roles = [
    "Software Engineer",
    "Product Manager",
    "Data Scientist",
    "DevOps Engineer",
    "UI/UX Designer",
];
const locations = [
    "Mumbai",
    "Bangalore",
    "Delhi",
    "Hyderabad",
    "Pune",
    "Chennai",
];
const colleges = [
    "IIT Bombay",
    "BITS Pilani",
    "NIT Trichy",
    "VJTI Mumbai",
    "DTU Delhi",
];
const skills = [
    "JavaScript",
    "Python",
    "Java",
    "React",
    "Node.js",
    "AWS",
    "Docker",
    "Kubernetes",
    "Machine Learning",
];

for (let i = 3; i <= 100; i++) {
    dummyAlumni.push({
        id: i,
        name: indianNames[i % indianNames.length],
        profilePic: `https://i.pravatar.cc/150?img=${i % 70}`,
        currentCompany: companies[Math.floor(Math.random() * companies.length)],
        role: roles[Math.floor(Math.random() * roles.length)],
        location: locations[Math.floor(Math.random() * locations.length)],
        pastCollege: colleges[Math.floor(Math.random() * colleges.length)],
        yearsOfExperience: Math.floor(Math.random() * 15) + 1,
        skills: Array.from(
            { length: 3 },
            () => skills[Math.floor(Math.random() * skills.length)]
        ),
        industry: "Technology",
        linkedinUrl: `https://linkedin.com/in/alumni${i}`,
    });
}

// Add TSEC specific data
const tsecNames = [
    "Aditya Shah",
    "Riya Mehta",
    "Kunal Punjabi",
    "Prachi Savla",
    "Dhruv Gala",
    "Shreya Kothari",
    "Vishal Sanghvi",
    "Tanvi Sheth",
    "Rohan Parekh",
    "Nishi Doshi",
    "Jay Thakkar",
    "Mansi Gandhi",
    "Harsh Dedhia",
    "Khushi Pathak",
    "Raj Mehta",
    "Diya Shah",
    "Parth Vora",
    "Ishita Jain",
    "Mihir Sheth",
    "Krisha Thakkar"
];

const tsecRoles = [
    "Full Stack Developer",
    "Machine Learning Engineer",
    "Cloud Solutions Architect",
    "Data Engineer",
    "Backend Developer",
    "Frontend Developer",
    "DevOps Specialist",
    "System Analyst",
    "Software Development Engineer",
    "Technical Lead"
];

const mumbaiCompanies = [
    "JP Morgan Chase",
    "Morgan Stanley",
    "Deutsche Bank",
    "Nomura",
    "Credit Suisse",
    "Accenture",
    "Capgemini",
    "LTI Mindtree",
    "Amdocs",
    "Deloitte"
];

// Add 20 TSEC alumni
const tsecAlumni = tsecNames.map((name, index) => ({
    id: dummyAlumni.length + index + 1,
    name,
    profilePic: `https://i.pravatar.cc/150?img=${(index + 71) % 100}`,
    currentCompany: mumbaiCompanies[Math.floor(Math.random() * mumbaiCompanies.length)],
    role: tsecRoles[Math.floor(Math.random() * tsecRoles.length)],
    location: "Mumbai",
    pastCollege: "Thadomal Shahani Engineering College",
    yearsOfExperience: Math.floor(Math.random() * 8) + 1, // 1-8 years experience
    skills: Array.from(
        { length: 4 },
        () => skills[Math.floor(Math.random() * skills.length)]
    ),
    industry: "Technology",
    linkedinUrl: `https://linkedin.com/in/${name.toLowerCase().replace(' ', '-')}`,
}));

// Add TSEC alumni to main array
dummyAlumni.push(...tsecAlumni);

export default dummyAlumni;
