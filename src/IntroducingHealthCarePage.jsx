import { useNavigate } from "react-router-dom";
import "./IntroducingHealthCarePage.css";
import Sidebar from "./components/Sidebar";

export default function IntroducingHealthCarePage() {
  const navigate = useNavigate();

  return (
    <div className="page">
      {/* Sidebar on the left */}
      <Sidebar />

      {/* Main content on the right */}
      <div className="content">
        {/* Header */}
        <header className="header">
          <h1 className="title">HealthCare Chatbox</h1>
          <button className="login-btn" onClick={() => navigate("/login")}>
            Log In
          </button>
        </header>

        {/* Main */}
        <main className="main">
          <section id="home"> 
          <p className="established">Established on October 19, 2025</p>

          <h2 className="headline">HealthCare To Everyone</h2>

          <button
            className="submit-button"
            onClick={() => navigate("/login")}
          >
            Try HealthCare Chatbox →
          </button>

          <hr className="divider" />

          <p className="paragraph">
            We’ve trained a HealthCare model to help everyone easily access reliable
            health information with no stress — only trustworthy, authenticated sources.
          </p>

          <p className="paragraph">
            The HealthCare Chatbox provides accurate insights and fast answers,
            aiming to make health guidance simple and stress-free for everyone.
          </p>

          <p className="paragraph">
            Our goal is to make healthcare information accessible to all. Whether you're
            managing daily wellness, exploring treatment options, or simply learning more
            about your health, our chatbox provides clear, evidence-based guidance that you
            can trust.
          </p>

          <p className="paragraph">
            Built with empathy and transparency in mind, the HealthCare Chatbox combines
            advanced AI technology with verified medical data to deliver information that is
            accurate, easy to understand, and available anytime you need it. 
          </p>

          <p className="paragraph">
            We believe that knowledge empowers people to make better decisions about their
            health and well-being. The HealthCare Chatbox is not a replacement for
            professional care — it’s a companion designed to help users prepare for doctor
            visits, interpret health advice, and feel more confident in their choices.
          </p>

          <p className="paragraph">
            Together, we’re creating a world where accessing reliable healthcare information
            is simple, stress-free, and available to everyone.
          </p>

          </section>

          {/* About Us */}
          <section id="about">
            <h2 className="headline">About Us</h2>
            <p className="paragraph">
              We are the developer team from <strong> <a href="https://www.sjsu.edu/"> San José State University (SJSU) </a></strong> — <a href="https://www.linkedin.com/in/dattang12/">Dat Tang</a>, <a href="https://www.linkedin.com/in/cahidetuncer/">Cahide Tuncer</a>, <a href="https://www.linkedin.com/in/kate-liu-huiguan/">Kate Liu</a>, <a href="https://www.linkedin.com/in/suhaas-teja">Suhaas Vijjagiri</a>, <a href="https://www.linkedin.com/in/jie-yan-lin-b108a130b">Jie-Yan (Lothar) Lin</a>
              . Our team combines diverse skills across frontend development, backend engineering, data science, and UI/UX design to build the HealthCare Chatbox — an intelligent, user-friendly platform that bridges technology and healthcare. Each member contributes unique expertise in software engineering, API integration, and health data research, ensuring our system is both accurate and easy to use.
              Guided by our shared vision of making healthcare information accessible, trustworthy, and stress-free, we are continuously refining our AI model through research, collaboration, and community feedback. Together, we strive to demonstrate how technology from SJSU students can have a real, positive impact on public health.
            </p>
          </section>

          {/* Services Section */}
          <section id="services" className="section">
            <h2 className="headline">Our Services</h2>

            <p className="paragraph">
              Our goal is to make healthcare guidance simple, reliable, and accessible for
              everyone. The HealthCare Chatbox offers a range of intelligent tools designed
              to assist users in understanding, managing, and improving their health with
              confidence.
            </p>

            <ul className="services-list">
              <li><strong>24/7 AI Health Chatbot</strong> — Get instant responses to your health-related questions anytime, powered by advanced AI trained on verified medical data.</li>

              <li> <strong>Personalized Health Tips</strong> — Receive health and lifestyle recommendations tailored to your habits, age, and goals, helping you maintain a balanced and healthier life.</li>

              <li> <strong>Symptom Checker</strong> — Input your symptoms to receive possible causes, suggestions for next steps, and guidance on when to seek medical advice from professionals.</li>

              <li> <strong>Verified Medical Resources</strong> — Access a curated library of articles, research summaries, and wellness information reviewed by healthcare experts for accuracy and trustworthiness.</li>
            </ul>

          </section>
          


          {/* Articles Section */}
          <section id="articles" className="section">
            <h2 className="headline">Articles / Resources</h2>
            <p className="paragraph">
              The Articles & Resources section connects you with trusted health data,
              research papers, and educational materials. Our AI continuously summarizes new
              studies from verified databases like <a href="https://www.nih.gov/">NIH</a>, <a href="https://pubmed.ncbi.nlm.nih.gov/">PubMed</a>, and <a href="https://www.cdc.gov/">CDC</a>, so you always have
              access to the most current, evidence-based information — without the jargon.
            </p>

          </section>

          {/* Feedback Section */}
          <section id="feedback" className="section">
            <h2 className="headline">Feedback</h2>
            <p className="paragraph">We’d love to hear from you!</p>
            <form>
              <textarea
                placeholder="Write your feedback here..."
                rows="5"
                className="feedback-input"
              ></textarea>
              <button className="submit-button">Submit Feedback</button>
            </form>
          </section>
        </main>


        {/* Footer */}
        <footer className="footer">
          © 2025 HealthCare Chatbox · All rights reserved
        </footer>
      </div>
    </div>
  );
}
