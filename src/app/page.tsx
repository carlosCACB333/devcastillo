import { Footer } from "@/components/common/footer";
import { CertificateSection } from "@/components/home/certificates-section";
import { ContactSection } from "@/components/home/contact-section";
import { ExperienceSection } from "@/components/home/experience-section";
import { Hero } from "@/components/home/hero";
import { ChatBoot } from "@/components/home/hero/ChatBoot";
import { AboutSection } from "@/components/home/hero/about-section";
import { ProjectSection } from "@/components/home/project-section";
import { SkillSection } from "@/components/home/skill-section";
import { Locale, Stage } from "@/generated/graphql";
import { GRAPH_SDK } from "@/utils/sdk";
import {
  AiFillSafetyCertificate,
  AiOutlineFundProjectionScreen,
} from "react-icons/ai";
import { BsFillPostcardFill } from "react-icons/bs";

export default async function Home() {
  const {
    categories,
    certifications,
    certificationsConnection,
    postsConnection,
    projectsConnection,
    projects,
  } = await GRAPH_SDK.getHomeData(
    {
      locales: [Locale.Es],
      stage: Stage.Published,
    },
    {}
  );

  return (
    <div className="container mx-auto max-w-7xl px-6 flex-grow">
      <main>
        <Hero
          features={[
            {
              icon: <AiFillSafetyCertificate size={32} />,
              title: "Certificaciones",
              description: certificationsConnection?.aggregate?.count + "+",
              href: "#home-certifications",
            },
            {
              icon: <AiOutlineFundProjectionScreen size={32} />,
              title: "Proyectos",
              description: projectsConnection?.aggregate?.count + "+",
              href: "#home-projects",
            },
            {
              icon: <BsFillPostcardFill size={32} />,
              title: "Publicaciones",
              description: postsConnection?.aggregate?.count + "+",
              href: "/blog",
            },
          ]}
        />
        <AboutSection />
        <ExperienceSection />
        <SkillSection categories={categories as any} />
        <ProjectSection projects={projects as any} />
        <CertificateSection certifications={certifications as any} />
        <ContactSection />
      </main>
      <Footer />
      <ChatBoot />
    </div>
  );
}

export const revalidate = 36000; // 1 hour
