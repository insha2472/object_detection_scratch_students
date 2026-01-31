// Minimal JS for the portfolio
const projects = [
  {
    title: 'Fake Product Identification using QR Code',
    desc: 'Designed a system to verify product authenticity using QR codes; stored and validated product data using a database to reduce counterfeit products and improve customer trust.',
    link: '#',
    tags: ['QR','Database','Python']
  },
  {
    title: 'Loan Application and Tracking System',
    desc: 'Developed using HTML, CSS, JavaScript, and MySQL; supports user login, loan application, and real-time status updates for secure, organized loan management.',
    link: '#',
    tags: ['Web','MySQL','JavaScript']
  }
]

function renderProjects(){
  const container = document.getElementById('projects-list')
  container.innerHTML = ''
  projects.forEach(p => {
    const card = document.createElement('article')
    card.className = 'project'
    card.innerHTML = `
      <h4>${p.title}</h4>
      <p>${p.desc}</p>
      <p><small>${p.tags.join(' • ')}</small></p>
      <p><a class="btn" href="${p.link}">View</a></p>
    `
    container.appendChild(card)
  })
}

// contact form simple handler
const form = document.getElementById('contact-form')
if(form){
  form.addEventListener('submit', (e)=>{
    e.preventDefault()
    alert('Thanks! Your message was submitted (demo).')
    form.reset()
  })
}

// insert current year
document.getElementById('year').textContent = new Date().getFullYear()

// init
renderProjects()