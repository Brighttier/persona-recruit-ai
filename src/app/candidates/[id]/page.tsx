
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Briefcase, CalendarDays, GraduationCap, Linkedin, Link as LinkIcon, Mail, MapPin, Phone, Star, Video, FileText, Edit3, Download } from 'lucide-react';
import { Container } from '@/components/shared/Container';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// Mock candidate data - in a real app, this would come from a database or API
const MOCK_CANDIDATE = {
  id: '1',
  fullName: 'Alice Wonderland',
  avatarUrl: 'https://placehold.co/150x150.png?a=1',
  currentTitle: 'Senior Software Engineer',
  location: 'Remote (Wonderland, CA)',
  email: 'alice.w@example.com',
  phone: '(555) 123-4567',
  linkedinProfile: 'https://linkedin.com/in/alicewonderland',
  portfolioUrl: 'https://alicew.dev',
  experienceSummary: "Highly skilled and innovative Senior Software Engineer with 8+ years of experience in developing and implementing cutting-edge web applications. Proven ability to lead projects, mentor junior developers, and collaborate effectively in agile environments. Passionate about creating intuitive user experiences and leveraging new technologies to solve complex problems. Seeking a challenging remote role where I can contribute to meaningful projects and continue to grow professionally.",
  skills: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker', 'Kubernetes', 'GraphQL', 'System Design', 'Agile Methodologies'],
  experience: [
    {
      title: 'Senior Software Engineer',
      company: 'Tech Solutions Inc.',
      period: 'Jan 2020 - Present',
      description: 'Led a team of 5 engineers in developing a new SaaS platform using Next.js and AWS. Implemented CI/CD pipelines, reducing deployment time by 40%. Mentored junior developers and conducted code reviews.',
      logo: 'https://placehold.co/50x50.png?c=tech'
    },
    {
      title: 'Software Engineer',
      company: 'Innovate LLC',
      period: 'Jun 2016 - Dec 2019',
      description: 'Developed and maintained features for a large-scale e-commerce application. Contributed to migrating legacy code to a modern React-based architecture.',
      logo: 'https://placehold.co/50x50.png?c=innovate'
    },
  ],
  education: [
    {
      degree: 'M.S. in Computer Science',
      institution: 'Wonderland University',
      period: '2014 - 2016',
    },
    {
      degree: 'B.S. in Software Engineering',
      institution: 'Tech State College',
      period: '2010 - 2014',
    },
  ],
  certifications: [
    { name: 'AWS Certified Solutions Architect – Associate', issuer: 'Amazon Web Services', date: '2021' },
    { name: 'Certified Kubernetes Administrator (CKA)', issuer: 'Cloud Native Computing Foundation', date: '2022' },
  ],
  videoIntroUrl: 'https://placehold.co/320x180.mp4', // Placeholder for video,
  resumeUrl: '#', // Placeholder for resume download
};

async function getCandidateDetails(id: string) {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 50));
  if (id === MOCK_CANDIDATE.id) {
    return MOCK_CANDIDATE;
  }
  return null;
}

export default async function CandidateProfilePage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const candidate = await getCandidateDetails(id);

  if (!candidate) {
    return (
      <Container className="text-center py-20">
        <h1 className="text-3xl font-bold text-destructive">Candidate Not Found</h1>
        <p className="text-muted-foreground mt-2">The candidate profile you are looking for does not exist.</p>
        <Link href="/candidates" passHref>
          <Button variant="outline" className="mt-6">
            Back to Candidates
          </Button>
        </Link>
      </Container>
    );
  }

  return (
    <Container className="max-w-5xl mx-auto">
      <Card className="shadow-xl overflow-hidden">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-primary/80 to-accent/80 p-8 relative">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <Avatar className="w-32 h-32 md:w-40 md:h-40 border-4 border-background shadow-lg">
              <AvatarImage src={candidate.avatarUrl || undefined} alt={candidate.fullName} data-ai-hint="profile person" />
              <AvatarFallback className="text-5xl bg-background text-primary">
                {candidate.fullName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="text-center md:text-left pt-2 text-primary-foreground">
              <h1 className="text-3xl md:text-4xl font-headline font-bold">{candidate.fullName}</h1>
              <p className="text-xl md:text-2xl font-medium opacity-90">{candidate.currentTitle}</p>
              <div className="flex items-center justify-center md:justify-start text-sm opacity-80 mt-1">
                <MapPin className="h-4 w-4 mr-1.5" /> {candidate.location}
              </div>
              <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
                {candidate.linkedinProfile && (
                  <Button variant="ghost" size="sm" asChild className="text-primary-foreground hover:bg-white/20">
                    <a href={candidate.linkedinProfile} target="_blank" rel="noopener noreferrer">
                      <Linkedin className="h-4 w-4 mr-1.5" /> LinkedIn
                    </a>
                  </Button>
                )}
                {candidate.portfolioUrl && (
                  <Button variant="ghost" size="sm" asChild className="text-primary-foreground hover:bg-white/20">
                    <a href={candidate.portfolioUrl} target="_blank" rel="noopener noreferrer">
                      <LinkIcon className="h-4 w-4 mr-1.5" /> Portfolio
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
          <div className="absolute top-4 right-4">
             <Button variant="secondary" size="sm"><Edit3 className="h-4 w-4 mr-2" /> Edit Profile</Button>
          </div>
        </div>

        <CardContent className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Sidebar / Contact Info */}
            <div className="md:col-span-1 space-y-6">
              <Card>
                <CardHeader><CardTitle className="text-lg">Contact Information</CardTitle></CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex items-center"><Mail className="h-4 w-4 mr-2 text-primary" /> {candidate.email}</div>
                  {candidate.phone && <div className="flex items-center"><Phone className="h-4 w-4 mr-2 text-primary" /> {candidate.phone}</div>}
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle className="text-lg">AI Generated Skills</CardTitle></CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {candidate.skills.map(skill => <Badge key={skill} variant="default">{skill}</Badge>)}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader><CardTitle className="text-lg">Resume</CardTitle></CardHeader>
                <CardContent>
                  <Button asChild variant="outline" className="w-full">
                    <a href={candidate.resumeUrl} download={`${candidate.fullName}_Resume.pdf`}>
                      <Download className="h-4 w-4 mr-2" /> Download Resume
                    </a>
                  </Button>
                </CardContent>
              </Card>

            </div>

            {/* Main Content Area */}
            <div className="md:col-span-2 space-y-8">
              <Card>
                <CardHeader><CardTitle className="text-xl">Summary</CardTitle></CardHeader>
                <CardContent><p className="text-foreground/80 leading-relaxed">{candidate.experienceSummary}</p></CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle className="text-xl">Video Introduction (10s)</CardTitle></CardHeader>
                <CardContent>
                  {candidate.videoIntroUrl ? (
                     <div className="aspect-video bg-muted rounded-md overflow-hidden">
                        <video controls src={candidate.videoIntroUrl} className="w-full h-full object-cover" poster="https://placehold.co/320x180.png?text=Video+Preview" data-ai-hint="video placeholder">
                            Your browser does not support the video tag.
                        </video>
                     </div>
                  ) : (
                    <p className="text-muted-foreground">No video introduction uploaded.</p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle className="text-xl">Education</CardTitle></CardHeader>
                <CardContent className="space-y-4">
 <Table>
 <TableHeader>
 <TableRow>
 <TableHead className="w-[200px]">Degree</TableHead>
 <TableHead>Institution</TableHead>
 <TableHead className="w-[150px]">Period</TableHead>
 </TableRow>
 </TableHeader>
 <TableBody>
 {candidate.education.map((edu, index) => (
 <TableRow key={index}>
 <TableCell className="font-medium">{edu.degree}</TableCell>
 <TableCell>{edu.institution}</TableCell>
 <TableCell>{edu.period}</TableCell>
 </TableRow>
 ))}
 </TableBody>
 </Table>
                </CardContent>
              </Card>

              {candidate.certifications.length > 0 && (
                <Card>
                  <CardHeader><CardTitle className="text-xl">Certifications</CardTitle></CardHeader>
                  <CardContent>
 <Table>
 <TableHeader>
 <TableRow>
 <TableHead className="w-[200px]">Name</TableHead>
 <TableHead>Issuer</TableHead>
 <TableHead className="w-[100px]">Date</TableHead>
 </TableRow>
 </TableHeader>
 <TableBody>
 {candidate.certifications.map((cert, index) => (
 <TableRow key={index}>
 <TableCell className="font-medium">{cert.name}</TableCell>
 <TableCell>{cert.issuer}</TableCell>
 <TableCell>{cert.date}</TableCell>
 </TableRow>
 ))}
 </TableBody>
 </Table>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader><CardTitle className="text-xl">Experience</CardTitle></CardHeader>
                <CardContent>
                  {candidate.experience.map((exp, index) => (
 <div key={index}>
                        {/* Table for Experience */}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-6 md:p-8 border-t flex justify-end">
            <Button variant="default" size="lg">
                <Star className="h-4 w-4 mr-2" /> Consider for Job
            </Button>
        </CardFooter>
      </Card>
    </Container>
  );
}
