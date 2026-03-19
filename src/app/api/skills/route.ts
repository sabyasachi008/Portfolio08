import { NextResponse } from 'next/server';

export async function GET() {
  const skillsData = {
    frontend: ["JavaScript", "React", "Next.js", "TypeScript", "Tailwind CSS", "HTML/CSS"],
    backend: ["Node.js", "Nest.js", "Express.js", "Java", "Spring Boot", "gRPC", "REST APIs", "Redis"],
    cloudAndData: ["AWS (Glue, Redshift, EMR, S3)", "PySpark", "Apache Airflow", "SQL", "MongoDB"],
    tools: ["Git", "Docker", "Linux", "Webpack", "Postman", "Framer Motion"]
  };
  
  // Real HTTP response delay to simulate realistic network latency for the UI effect
  await new Promise((resolve) => setTimeout(resolve, 800));

  return NextResponse.json(
    {
      status: 200,
      message: "Skills retrieved successfully",
      data: skillsData
    },
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}
