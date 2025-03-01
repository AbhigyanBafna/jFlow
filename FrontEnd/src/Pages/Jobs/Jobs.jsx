import React, { useState } from "react";
import { IoBagOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import { HiOutlineDocumentText } from "react-icons/hi";
import { TfiTimer } from "react-icons/tfi";
import { AiOutlinePlus } from "react-icons/ai";
import { IoBagAddSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";

const Jobs = () => {
    const [Data, setData] = useState([
        {
            id: 1,
            title: "Sales Executive",
            company: "Tushar Hr Consultancy",
            experience: "0 - 4 years",
            salary: "Not Disclosed",
            location: "Ambikapur, Gondiya, Mangaon, Delhi / NCR",
            candidate: "Hired",
            posted: "2 Days ago",
            jobId: "sales-exec",
            jobApplicants: 12,
            keySkills: ["Sales", "Marketing"],
        },
        {
            id: 2,
            title: "Software Engineer",
            company: "Tech Solutions Ltd.",
            experience: "2 - 6 years",
            salary: "₹8 - 12 LPA",
            location: "Bangalore, Hyderabad",
            candidate: "Shortlisted",
            posted: "5 Days ago",
            jobId: "software-eng",
            jobApplicants: 20,
            keySkills: ["JavaScript", "React", "Node.js"],
        },
        {
            id: 3,
            title: "Digital Marketing Specialist",
            company: "Creative Media Pvt Ltd",
            experience: "1 - 3 years",
            salary: "₹4 - 6 LPA",
            location: "Mumbai, Pune",
            candidate: "Interview Scheduled",
            posted: "1 Week ago",
            jobId: "digital-marketing",
            jobApplicants: 15,
            keySkills: ["SEO", "Google Ads", "Content Marketing"],
        },
    ]);

    return (
        <div>
            <div className="jobs-1">
                <div className="recomend">
                    <IoBagAddSharp className="Icons-bag" />
                    <h2 className="job-text">Recommended Jobs for You</h2>
                </div>
                <div className="select">
                    <span>You can apply for Jobs here!</span>
                </div>
            </div>
            <div className="posting-jobs">
                {/* SECTION1 */}
                <div className="section-1">
                    <div className="manage-jobs">
                        <div className="cyber">
                            <img
                                src="https://images.squarespace-cdn.com/content/v1/576a6006f5e23175ba4e41d8/1595066134418-O7DO7A6F7FZATW78PAI4/Cyber+Security+Boot+Camp?format=500w"
                                alt="alt"
                                style={{ width: "100%" }}
                            />
                        </div>
                        <div style={{ marginTop: "12px" }}>
                            <h2 className="job-prefence">
                                We could not find any jobs matching your
                                preferences
                            </h2>
                            <ul>
                                <li className="match-criteria">
                                    . We will notify you as soon as a new job is
                                    posted matching your criteria
                                </li>
                                <li className="match-criteria">
                                    .{" "}
                                    <Link className="Link">
                                        Manage Your Preferences
                                    </Link>{" "}
                                    to ensure you receive the most relevant jobs
                                </li>
                            </ul>
                        </div>
                    </div>
                    <h2 className="total-jobs">
                        {Data.length} Jobs based on Your Desired Preferences
                    </h2>
                    {Data.map((item) => (
                        <Link to={`/jobspage/${item.id}`} key={item.jobId}>
                            <div className="job-data" key={item.id}>
                                <div className="data-marked">
                                    <h2>{item.title}</h2>
                                </div>
                                <div className="company-jobs">
                                    {item.company}
                                </div>
                                <div className="education">
                                    <IoBagOutline className="icons-experience" />
                                    <ul> {item.experience}</ul>
                                    <ul>{item.salary}</ul>
                                    <ul style={{ display: "flex", gap: "3px" }}>
                                        <CiLocationOn className="loc-icon" />
                                        {item.location}
                                    </ul>
                                </div>
                                <div className="text-outline">
                                    <HiOutlineDocumentText className="loc-icon" />{" "}
                                    {item.candidate}
                                </div>

                                <div className="keyskill">
                                    {item.keySkills.map((elem, index) => {
                                        if (index < 2) {
                                            return (
                                                <span
                                                    key={index}
                                                    className="job-skills"
                                                >
                                                    {elem}
                                                </span>
                                            );
                                        }
                                        return null;
                                    })}
                                </div>
                                <div className="time-btn">
                                    <Button size="xs">
                                        <TfiTimer />
                                        {item.posted}
                                    </Button>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                {/* SECTION2 */}
                <div className="section-2">
                    <div className="job-criteria">
                        <div className="add-prefer">
                            <h2>
                                Get jobs matching your criteria by adding below
                                preferences
                            </h2>
                            <div className="email-market">
                                <img
                                    src="https://image.freepik.com/free-vector/landing-page-send-message-illustration_126608-31.jpg"
                                    alt=""
                                    style={{ width: "100%" }}
                                />
                            </div>
                        </div>
                        <div>
                            <span className="outline">
                                <AiOutlinePlus className="add-icons" />
                                <Link className="Link">
                                    Add Your Preferred Job Role
                                </Link>
                            </span>
                            <span className="outline">
                                <AiOutlinePlus className="add-icons" />{" "}
                                <Link className="Link">
                                    Add Your Preferred Work Location{" "}
                                </Link>{" "}
                            </span>
                            <span className="outline">
                                <AiOutlinePlus className="add-icons" />
                                <Link className="Link">
                                    Add Your Preferred Salary
                                </Link>{" "}
                            </span>
                        </div>
                    </div>
                </div>
                {/* SECTION2 */}
            </div>
        </div>
    );
};

export default Jobs;
