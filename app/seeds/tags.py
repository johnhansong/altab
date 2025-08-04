from app.models import db, Tag, environment, SCHEMA
from sqlalchemy.sql import text

def seed_tags():
  demo_tag_1 = Tag(
    name="Productivity", description="To-do lists, calendars, and automation tools."
  )
  demo_tag_2 = Tag(
    name="Search & Discovery", description="Search engines, databases, aggregators (e.g. Google, DuckDuckGo, Wolfram Alpha)"
  )
  demo_tag_3 = Tag(
    name="Education", description="Education, resources, textbooks, and more"
  )
  demo_tag_4 = Tag(
    name="Creativity", description="Tools that assist in bringing your creativity to life"
  )
  demo_tag_5 = Tag(
    name="Finance", description="Finance, Budgeting, Stocks, etc."
  )
  demo_tag_6 = Tag(
    name="Tech Tools", description="Web services that help you build, deploy, and automate"
  )
  demo_tag_7 = Tag(
    name="News", description="Sites that keep you informed or give you a platform to publish"
  )
  demo_tag_8 = Tag(
    name="Well Being", description="Digital companions for a healthier, calmer life"
  )
  demo_tag_9 = Tag(
    name="Utilities", description="Small but mighty tools that solve everyday hassles"
  )

  a_tag_1 = Tag(
    name="AI Tools", description="Platforms powered by artificial intelligence to generate content, automate tasks, or enhance workflows."
  )
  a_tag_2 = Tag(
    name="Art & Design", description="Sites for creating, discovering, or showcasing visual art and digital designs."
  )
  a_tag_3 = Tag(
    name="APIs", description="Developer-accessible services or endpoints for building applications and automating processes."
  )

  b_tag_1 = Tag(
    name="Budgeting", description="Tools to help manage personal or business finances, expenses, and savings goals."
  )
  b_tag_2 = Tag(
    name="Blogging", description="Platforms for writing, publishing, and sharing blog content or articles."
  )
  b_tag_3 = Tag(
    name="Browser Extensions", description="Add-ons that extend browser functionality for productivity, privacy, or customization."
  )

  c_tag_1 = Tag(
    name="Coding", description="Interactive environments to practice, learn, or test programming skills"
  )
  c_tag_2 = Tag(
    name="Calendars", description="Tools to schedule tasks, manage time, and organize events collaboratively or individually."
  )
  c_tag_3 = Tag(
    name="Crypto & Blockchain", description="Services related to cryptocurrency trading, wallets, or blockchain exploration."
  )

  d_tag_1 = Tag(
    name="Databases", description="Cloud or local platforms for managing structured data, querying, and analytics"
  )
  d_tag_2 = Tag(
    name="Design", description="Curated libraries of creative work and UI/UX examples to spark ideas."
  )
  d_tag_3 = Tag(
    name="DevOps", description="Tools for deployment, CI/CD pipelines, infrastructure automation, and monitoring."
  )

  e_tag_1 = Tag(
    name="E-commerce", description="Services for buying, selling, or managing online stores."
  )
  e_tag_2 = Tag(
    name="Email", description="Apps for managing, sending, or temporarily masking email addresses."
  )

  f_tag_1 = Tag(
    name="Fonts", description="Libraries and tools for browsing, downloading, or testing typography"
  )
  f_tag_2 = Tag(
    name="Freelancing", description="Marketplaces and platforms to find freelance work or hire contractors"
  )
  f_tag_3 = Tag(
    name="Free", description="ITS FREE!"
  )

  g_tag_1 = Tag(
    name="Games", description="Web-based entertainment from indie titles to retro emulators"
  )
  g_tag_2 = Tag(
    name="Graphic Design", description="Tools for creating graphics, logos, and marketing visuals"
  )
  g_tag_3 = Tag(
    name="Google", description="Tools from Google"
  )

  h_tag_1 = Tag(
    name="Health", description="Resources for mental health, fitness, nutrition, meditation, etc."
  )
  h_tag_2 = Tag(
    name="Hosting", description="Services for website deployment, domains, cloud storage, etc."
  )
  h_tag_3 = Tag(
    name="HTML/CSS", description="Generators, validators, and playgrounds for writing or previewing front-end code."
  )

  i_tag_1 = Tag(
    name="Investing", description="Platforms and dashboards for analyzing stocks, crypto, and other investment options."
  )
  i_tag_2 = Tag(
    name="Image Editors", description="Online tools to crop, edit, and enhance photos or create visuals."
  )
  i_tag_3 = Tag(
    name="IDE/Dev Environments", description="Web-based coding environments supporting multiple languages and frameworks"
  )

  j_tag_1 = Tag(
    name="Job Boards", description="Aggregators and portals for discovering jobs"
  )
  j_tag_2 = Tag(
    name="JavaScript Tools", description="Libraries, snippets, and playgrounds for learning or implementing JS functionality."
  )
  j_tag_3 = Tag(
    name="Journaling", description="Digital platforms for personal reflections, mental health tracking, or other personal journaling."
  )

  k_tag_1 = Tag(
    name="Knowledge Management", description="Tools for note organization, research, and company/personal knowledge bases"
  )
  k_tag_2 = Tag(
    name="Kids Learning", description="Educational resources and games tailored for children's development."
  )

  l_tag_1 = Tag(
    name="Language Learning", description="Tools and platforms to practice, learn, or translate foreign languages."
  )
  l_tag_2 = Tag(
    name="Live Collaboration", description="Platforms for creative work generation with multiple users in real time"
  )

  m_tag_1 = Tag(
    name="Marketing", description="Tools for campaign automation, SEO, analytics, and lead generation."
  )
  m_tag_2 = Tag(
    name="Mind Mapping", description="Visual diagram tools for brainstorming, planning or organizing ideas."
  )
  m_tag_3 = Tag(
    name="Music", description="Platforms for discovering, streaming, or composing music."
  )

  n_tag_1 = Tag(
    name="Notes", description="Tools for capturing quick thoughts, research, or general information."
  )

  o_tag_1 = Tag(
    name="Open Source", description="Communities and respositories for collaborative coding and contributions."
  )
  o_tag_2 = Tag(
    name="Online Courses", description="Educational platforms offering structured, often certificate-based courses."
  )
  o_tag_3 = Tag(
    name="Optimization Tools", description="Utilities to enhance webstite speed, SEO, or user experience."
  )

  p_tag_1 = Tag(
    name="PDF Tools", description="Edit, compress, sign, or convert PDFs"
  )
  p_tag_2 = Tag(
    name="Portfolio Builders", description="Tools to create personal websites or showcase for creative or tech work."
  )
  p_tag_3 = Tag(
    name="Paid", description="Tools/services that require payment for access"
  )

  q_tag_1 = Tag(
    name="Q&A Forums", description="Ask and you shall receive (answers)"
  )
  q_tag_2 = Tag(
    name="Quick Tools", description="Lightweight utilities"
  )
  q_tag_3 = Tag(
    name="Quotes & Inspiration", description="Motivational quotes or creative writing prompts"
  )

  r_tag_1 = Tag(
    name="Resume Builders", description="Templates and tools to design professional resumes and CVs"
  )
  r_tag_2 = Tag(
    name="Remote Work Tools", description="Collaboration and communication tools designed for distributed teams."
  )
  r_tag_3 = Tag(
    name="Reading", description="Resources/lists for books, blogs, or articles."
  )

  s_tag_1 = Tag(
    name="Screen Recorders", description="Capture screen video, tutorials, or demos."
  )
  s_tag_2 = Tag(
    name="Stock Photos", description="Libraries of free or premium imagery for use in creative projects."
  )

  t_tag_1 = Tag(
    name="Task Management", description="Kanban boards,checklists, and planners for tracking progress."
  )
  t_tag_2 = Tag(
    name="Time Tracking", description="Tools to log work hours, manage productivity, or invoice clients."
  )

  u_tag_1 = Tag(
    name="UI Kits", description="Collections of pre-built components and templates for user interface design."
  )
  u_tag_2 = Tag(
    name="URL Shortener", description="Shorten URLs and track clicks."
  )

  v_tag_1 = Tag(
    name="Video Editors", description="Trim, add effects, or create video content."
  )
  v_tag_2 = Tag(
    name="Virtual Events", description="Platforms for hosting webinars, workships, or live online gatherings."
  )
  v_tag_3 = Tag(
    name="VPNs", description="Protect online identity and access restricted content."
  )

  w_tag_1 = Tag(
    name="Web Development", description="Frameworks, playgrounds, and tutorials for front-end/back-end development."
  )
  w_tag_2 = Tag(
    name="Writing Tools", description="Grammar checkers, AI writing assistants, and style guides."
  )
  w_tag_3 = Tag(
    name="Wireframing", description="Apps for planning app and website structures before development."
  )

  x_tag_1 = Tag(
    name="XML/JSON Tools", description="Validators and formatters for structured data handling."
  )
  x_tag_2 = Tag(
    name="XP Tracking", description="Tools that track habits, goals, or learning using experience points"
  )

  y_tag_1 = Tag(
    name="Youtube Tools", description="Tools for video downloading, analytics, or content creation."
  )
  y_tag_2 = Tag(
    name="YAML Editors", description="Structured config file editors used in dev and infrastructure workflows."
  )

  z_tag_1 = Tag(
    name="Zen & Mindfulness", description="Digital companions for meditation, calm breathing, or digital detoxes. "
  )



  # demo_tag_10 = Tag(
  #   name="", description=""
  # )

  db.session.add(demo_tag_1)
  db.session.add(demo_tag_2)
  db.session.add(demo_tag_3)
  db.session.add(demo_tag_4)
  db.session.add(demo_tag_5)
  db.session.add(demo_tag_6)
  db.session.add(demo_tag_7)
  db.session.add(demo_tag_8)
  db.session.add(demo_tag_9)

  db.session.add(a_tag_1)
  db.session.add(a_tag_2)
  db.session.add(a_tag_3)

  db.session.add(b_tag_1)
  db.session.add(b_tag_2)
  db.session.add(b_tag_3)

  db.session.add(c_tag_1)
  db.session.add(c_tag_2)
  db.session.add(c_tag_3)

  db.session.add(d_tag_1)
  db.session.add(d_tag_2)
  db.session.add(d_tag_3)

  db.session.add(e_tag_1)
  db.session.add(e_tag_2)

  db.session.add(f_tag_1)
  db.session.add(f_tag_2)
  db.session.add(f_tag_3)

  db.session.add(g_tag_1)
  db.session.add(g_tag_2)
  db.session.add(g_tag_3)

  db.session.add(h_tag_1)
  db.session.add(h_tag_2)
  db.session.add(h_tag_3)

  db.session.add(i_tag_1)
  db.session.add(i_tag_2)
  db.session.add(i_tag_3)

  db.session.add(j_tag_1)
  db.session.add(j_tag_2)
  db.session.add(j_tag_3)

  db.session.add(k_tag_1)
  db.session.add(k_tag_2)

  db.session.add(l_tag_1)
  db.session.add(l_tag_2)

  db.session.add(m_tag_1)
  db.session.add(m_tag_2)
  db.session.add(m_tag_3)

  db.session.add(n_tag_1)

  db.session.add(o_tag_1)
  db.session.add(o_tag_2)
  db.session.add(o_tag_3)

  db.session.add(p_tag_1)
  db.session.add(p_tag_2)
  db.session.add(p_tag_3)

  db.session.add(q_tag_1)
  db.session.add(q_tag_2)
  db.session.add(q_tag_3)

  db.session.add(r_tag_1)
  db.session.add(r_tag_2)
  db.session.add(r_tag_3)

  db.session.add(s_tag_1)
  db.session.add(s_tag_2)

  db.session.add(t_tag_1)
  db.session.add(t_tag_2)

  db.session.add(u_tag_1)
  db.session.add(u_tag_2)

  db.session.add(v_tag_1)
  db.session.add(v_tag_2)
  db.session.add(v_tag_3)

  db.session.add(w_tag_1)
  db.session.add(w_tag_2)
  db.session.add(w_tag_3)

  db.session.add(x_tag_1)
  db.session.add(x_tag_2)

  db.session.add(y_tag_1)
  db.session.add(y_tag_2)

  db.session.add(z_tag_1)

  db.session.commit()

def undo_tags():
  if environment == "production":
    db.session.execute(f"TRUNCATE table {SCHEMA}.tags RESTART IDENTITY CASCADE;")
  else:
    db.session.execute(text("DELETE FROM tags"))

  db.session.commit()
