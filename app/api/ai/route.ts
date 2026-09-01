import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { text, task } = await req.json();
  let result = text;

  if (task === 'grammar') {
    result = text.charAt(0).toUpperCase() + text.slice(1).trim();
    if (!result.endsWith('.')) result += '.';
  }

  if (task === 'professional') {
    result = `Dear Hiring Manager,

I hope this letter finds you well. I am writing with great enthusiasm to express my sincere interest in the position advertised at your esteemed organization.

${text.charAt(0).toUpperCase() + text.slice(1)}

I bring with me a strong work ethic, excellent communication skills, and a genuine passion for learning and growth. I am highly motivated, adaptable, and committed to contributing positively to your team. I believe my dedication and eagerness to excel would make me a valuable asset to your organization.

Thank you most sincerely for considering my application. I have attached my resume and would be deeply honored to have the opportunity to discuss how my skills align with your needs.

With warmest regards and sincere appreciation,

Andria`;
  }

  if (task === 'summarize') {
    const sentences = text.split('.').filter((s:string)=>s.trim().length>10);
    result = sentences.slice(0,2).join('. ') + '.';
  }

  if (task === 'continue') {
    result = text + `

Furthermore, this opens up exciting new possibilities for growth and innovation. With careful attention and dedication, we can build upon this foundation to achieve remarkable results.

In conclusion, I am confident this approach will lead to meaningful success and lasting positive impact.`;
  }

  await new Promise(r=>setTimeout(r, 700));
  return NextResponse.json({ result });
}