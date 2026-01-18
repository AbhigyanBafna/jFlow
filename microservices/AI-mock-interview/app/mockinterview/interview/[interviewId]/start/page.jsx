"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import QuestionsSections from "./_compnents/QuestionsSections";
import RecordAnswerSection from "./_compnents/RecordAnswerSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function StartInterview({ params }) {
  const [interviewData, setInterviewData] = useState();
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  useEffect(() => {
    GetInterviewDetail();
  }, []);

  /**
   * Used to Get Interview Details by MockId/Interview Id
   */

  const GetInterviewDetail = async () => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, params.interviewId));

      if (!result || !result.length) {
        console.warn("No interview found for mockId:", params.interviewId);
        return;
      }

      console.log("result:", result);
      const raw = result[0]?.jsonMockResp;
      if (!raw) {
        console.warn("No jsonMockResp on record:", result[0]);
        setInterviewData(result[0]);
        return;
      }

      let jsonMockResp;
      try {
        jsonMockResp = JSON.parse(raw);
      } catch (err) {
        console.error("Failed to parse jsonMockResp:", err, raw);
        return;
      }

      console.log("jsonMockResp:", jsonMockResp);
      // Support both possible keys
      const questions =
        jsonMockResp.interview_questions || jsonMockResp.questions || [];

      if (!Array.isArray(questions) || questions.length === 0) {
        console.warn("No questions array found in jsonMockResp");
      } else {
        setMockInterviewQuestion(questions);
      }

      setInterviewData(result[0]);
    } catch (err) {
      console.error("GetInterviewDetail error:", err);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-24 pb-10">
        {/* Questions */}
        <QuestionsSections
          activeQuestionIndex={activeQuestionIndex}
          mockInterViewQuestion={mockInterviewQuestion}
        />
        {/* Video/ Audio Recording */}
        <RecordAnswerSection
          activeQuestionIndex={activeQuestionIndex}
          mockInterViewQuestion={mockInterviewQuestion}
          interviewData={interviewData}
        />
      </div>

      <div className="flex justify-end gap-6">
        {activeQuestionIndex > 0 && <Button disabled={activeQuestionIndex==0}  onClick={()=>setActiveQuestionIndex(activeQuestionIndex-1)}>Previous Question</Button>}

        {activeQuestionIndex !==
          mockInterviewQuestion?.length - 1 && <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex+1)}>Next Question</Button>}

        {activeQuestionIndex == mockInterviewQuestion?.length - 1 && (
          <Link  href={'/mockinterview/interview/'+interviewData?.mockId+"/feedback"}>
          
          <Button>End Interview</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default StartInterview;
