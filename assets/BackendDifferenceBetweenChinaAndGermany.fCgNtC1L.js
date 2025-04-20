const e=`---
layout: post
title: Backend difference between China and Germany
date: 2024-09-22 20:09:16
description: Backend Technical and interview difference between China and Germany.
---

I have 4 years of backend experience in China, and I recently moved to Germany. I’d like to share some differences I’ve noticed between backend development in China and Germany.

# 1. Backend Trends
## 1.1. IaaS vs. PaaS
### China
Most companies in China prefer IaaS and self-deploy their infrastructure. The reasons for choosing IaaS include:
1. Self-deployed or self-developed infrastructure is seen as a form of innovation, which can be useful for securing benefits.
2. Chinese companies tend to trust cloud services less, often using multiple cloud providers as a safeguard.
3. Cloud services are more expensive in China, while developer salaries are lower compared to Germany.

### Germany
In Germany, PaaS is the preferred choice. Companies integrate their applications into cloud services. If they choose AWS, they typically utilize the entire range of AWS products, such as RDS, CloudWatch, Lambda, API Gateway, S3, and SQS.

## 1.2. MySQL vs. PostgreSQL
### China
Most companies in China use MySQL, and this is reflected in interviews as well. Even if a company uses PostgreSQL, the interview questions will often focus on MySQL. This has become an unspoken norm between interviewers and candidates.

### Germany
More companies in Germany use PostgreSQL as their relational database of choice due to its advanced features and better performance for complex queries.

## 1.3. Popularity of JavaScript
### China
In China, JavaScript is almost exclusively considered a frontend language, with very few companies using it for backend development. Java and Golang dominate the backend scene. Also, backend interviews typically focus on Java, another unspoken understanding.

### Germany
In Germany, I’ve noticed many backend positions using Node.js. Even for Java or Golang roles, some job descriptions list JavaScript experience as a bonus.

## 1.4. Frontend/Backend vs. Fullstack
### China
In China, 90% of companies have dedicated frontend and backend engineers.

### Germany
In Germany, there are many fullstack positions.

# 2. Hiring Process
## 2.1. Resume preference
### China
In China, the focus is on the projects you’ve worked on. You should highlight your project experience as much as possible, avoiding anything you cannot explain, since all your projects will likely be discussed in detail during the technical interview.

### Germany
In Germany, it’s important to list as many technologies as possible. HR often filters candidates based on the technologies mentioned in the resume.

## 2.2. Interview Opportunities
### China
In China, HR is generally not responsible for evaluating a candidate’s technical skills. As long as candidates meet some basic criteria, they will move forward in the process. Most unqualified candidates are rejected in the first-round technical interview. In some extreme cases, team leads have to conduct interviews for an entire week.

### Germany
In Germany, recruiters filter about 90% of unqualified candidates based on their resumes. They carefully check each technology and requirement listed in the job description. If something is missing from your resume, you’ll likely receive a rejection email. This isn’t about the economy; it’s just how they filter for qualified candidates.

## 2.3. Coding Interviews
### China
Coding tests in China typically focus on LeetCode-style problems. You are given a problem and expected to solve it within 15 minutes. If you succeed, you pass; if not, you are rejected.

### Germany
In Germany, coding tests are more often in the form of take-home assignments. You are emailed a larger problem (e.g., creating a login system) and given two days to complete it, after which your solution is evaluated.

## 2.4. Technical Interviews
### China
In China, backend technical interviews focus heavily on the projects listed on your resume. The interviewer will choose a project of interest and ask deep questions, such as: What was the project’s background? How did you deliver certain features? How did you solve specific problems? They will keep asking until every technical detail is clear. Around 50% of the interview time will involve explaining your projects.

### Germany
In Germany, technical interviews focus more on the programming language itself. For a Java position, for example, you might be asked how to implement features using Java, the difference between inheritance and composition, or about new features in the language. In contrast, in China, companies generally don’t care about the specific programming languages you’ve used, assuming you can quickly adapt to new ones.

## 2.5. Salary
### China
In China, salaries are mostly based on your previous job’s salary (background checks are often conducted). Companies typically offer a 0–30% increase based on the interview, but every company has a salary raise cap. This means that whether you’re overqualified or underqualified, your salary won’t change too drastically.

### Germany
In Germany, salaries are more closely tied to years of experience. Recruiters prepare salary ranges based on experience levels and budget the positions accordingly, then use that as a filter for candidates.

## 2.6. Attitude towards Junior
### China
In China, Junior engineer are more welcomed than senior. This is primarily because their salaries are lower, and they tend to be more willing to obey to leader and overwork.

### Germany
In Germany, senior engineers seem to be in higher demand. I’ve noticed this based on the number of open positions for senior roles. However, I am not quite sure actually, maybe it's not graduation season.

## 2.7. Chat vs. Cover Letter
### China
In China, once candidates was selected to proceed, recruiter will connect candidates throught WeChat. Then discuss motivation, experience, achievements and more. The communication will last through whole hiring process.

### Germany
In Germany, you should include all your motivation, skills, and fit in the cover letter and attach it to your application.

# 3. Conclusion
This article is based on my personal experience. If it doesn’t apply to your situation, feel free to comment or reach out to me!`;export{e as default};
//# sourceMappingURL=BackendDifferenceBetweenChinaAndGermany.fCgNtC1L.js.map
