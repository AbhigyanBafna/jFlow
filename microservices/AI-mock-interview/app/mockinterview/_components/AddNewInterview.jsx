"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAIModel";
import { LoaderCircle } from "lucide-react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import moment from "moment/moment";
import { useRouter } from "next/navigation";

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("SDE 1");
  const [jobDesc, setJobDesc] = useState("React, Express.Js, Node.js, Redis, MongoDB");
  const [jobExperience, setJobExperience] = useState(0);
  const [loading, setLoading] = useState(false);
  const [JsonResponse, setJsonResponse] = useState([]);
  const { user } = useUser();
  const route = useRouter()

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const InputPromt = `
      Assume you are an AI Mock Interview Expert, designed to generate concise, voice-answerable interview questions.
      Generate EXACTLY one JSON object and NOTHING else (no markdown, no explanations, no code fences).
      Dont keep the questions open ended so that it can be evaluated easily with AI and answers

      ### Requirements:
      1) Output MUST be a single JSON object with the key "interview_questions" whose value is an ARRAY of exactly 5 question objects.
      2) Do NOT output any surrounding text, comments or code fences — only raw JSON.
      3) Each question object MUST have the following keys and types:
        - id: integer (1 through 5)
        - question: string (concise, direct, voice-answerable, <= 200 characters)

      ### Instructions:
      1. Create **5 interview questions** tailored to the following:
          - **Job Position**: ${jobPosition}
          - **Job Description/Tech Stack**: ${jobDesc}
          - **Years of Experience**: ${jobExperience}
      2. The questions should be **specific and direct**, ensuring they can be evaluated objectively using AI. Avoid open-ended or overly broad questions.
      3. Dont ask any code snippets and all since it is not feasible to explain orally.
      4. give strictly 5 questions in JSON format based on the following. Only return the JSON object with key \"interview_questions\" , without any additional text.
      5. Return example (for format reference ONLY; DO NOT return this example in output — it is shown here to illustrate schema):
        {
          "interview_questions": [
            {
              "id": 1,
              "question": "Explain the difference between HTTP GET and POST and when to use each.",
            }
          ]
        }
      `;

      const result = await chatSession.sendMessage(InputPromt);
      console.log(result);

      const MockJsonResp = result.response
        .text()
        .replace("```json", "")
        .replace("```", "");

      console.log(MockJsonResp);
      console.log(JSON.parse(MockJsonResp));
      setJsonResponse(JSON.parse(MockJsonResp));

      if (MockJsonResp) {
        const resp = await db.insert(MockInterview).values({
          mockId: uuidv4(),
          jsonMockResp: MockJsonResp,
          jobPosition: jobPosition,
          jobDesc: jobDesc,
          jobExperience: jobExperience,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("DD-MM-yyyy"),
        }).returning({ mockId: MockInterview.mockId });

        console.log("Insert ID:", resp);
        if (resp) {
          route.push('/mockinterview/interview/' + resp[0].mockId);
          setOpenDialog(false);
        }
      } else {
        console.error("Mock JSON response is empty or invalid.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      // You can also add user-friendly messages or display an alert here.
    } finally {
      setLoading(false);
    }

    console.log(JsonResponse);
  };

  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all delay-100"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="text-lg text-center">+ Add new</h2>
      </div>
      <Dialog open={openDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about your job interviewing
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div>
                  {/* <h2>Tell us more about your job interviewing</h2> */}
                  <h2>
                    Add Details about your job position/role, Job description
                    and years of experience
                  </h2>

                  <div className="mt-7 my-3">
                    <label>Job Role/Job Position</label>
                    <Input
                      onChange={(event) => setJobPosition(event.target.value)}
                      value = {jobPosition}
                      placeholder="Ex. Full Stack Developer"
                      required
                    />
                  </div>
                  <div className="mt-7 my-3">
                    <label>Job Description/Tech Stack (In Short)</label>
                    <Textarea
                      onChange={(event) => setJobDesc(event.target.value)}
                      value = {jobDesc}
                      placeholder="Ex. React, Angular, NodeJs, NextJs etc."
                      required
                    />
                  </div>
                  <div className="mt-7 my-3">
                    <label>Years of experience</label>
                    <Input
                      onChange={(event) => setJobExperience(event.target.value)}
                      value = {jobExperience}
                      placeholder="Ex. 5"
                      type="number"
                      max="50"
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-5 justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setOpenDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button disabled={loading} type="submit">
                    {loading ? (
                      <>
                        <LoaderCircle className="animate-spin" /> Generating
                        from AI
                      </>
                    ) : (
                      "Start Interview"
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
