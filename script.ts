
function createField(sectionId: string, htmlContent: string) {
    const section = document.getElementById(sectionId);
    if (section) {
        const div = document.createElement('div');
        div.innerHTML = htmlContent;
        section.appendChild(div);
    }
}

//remove 
function removeField(button: HTMLButtonElement) {
    button.parentElement?.remove();
}


function addEducation() {
    createField(
        'education-section',
        `
        <div>
            <label>Institute Name:</label>
            <input type="text" name="institute[]" required />
            <label>Degree/Field:</label>
            <input type="text" name="degree[]" required />
            <label>Year:</label>
            <input type="number" name="eduYear[]" required />
            <button type="button" class="remove-button" onclick="removeField(this)">-</button>
        </div>
        `
    );
}

function addExperience() {
    createField(
        'experience-section',
        `
        <div>
            <label>Company Name:</label>
            <input type="text" name="company[]" required />
            <label>Job Title:</label>
            <input type="text" name="jobTitle[]" required />
            <label>Start Year:</label>
            <input type="number" name="expStart[]" required />
            <label>End Year:</label>
            <input type="number" name="expEnd[]" required />
            <button type="button" class="remove-button" onclick="removeField(this)">-</button>
        </div>
        `
    );
}

function addCertification() {
    createField(
        'certifications-section',
        `
        <div>
            <label>Certification Name:</label>
            <input type="text" name="certification[]" required />
            <label>Issued By:</label>
            <input type="text" name="certIssuer[]" required />
            <label>Year:</label>
            <input type="number" name="certYear[]" required />
            <button type="button" class="remove-button" onclick="removeField(this)">-</button>
        </div>
        `
    );
}

function addSkill() {
    createField(
        'skills-section',
        `
        <div>
            <input type="text" name="skills[]" placeholder="Enter a skill" required />
            <button type="button" class="remove-button" onclick="removeField(this)">-</button>
        </div>
        `
    );
}

function addLanguage() {
    createField(
        'languages-section',
        `
        <div>
            <input type="text" name="language[]" placeholder="Enter a language" required />
            <button type="button" class="remove-button" onclick="removeField(this)">-</button>
        </div>
        `
    );
}

function populateResume(formData: FormData, photoHtml: string, resumeContainer: HTMLElement) {
    const containerStyle = `
        font-family: Arial, sans-serif; 
        margin: 20px auto; 
        padding: 20px; 
        border: 1px solid #ccc; 
        border-radius: 10px; 
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
        max-width: 800px; 
        background-color:rgb(255, 255, 255); 
        color: #333;
        line-height: 1.6;
    `;

    const headerStyle = `
        text-align: center; 
        margin-bottom: 20px;
    `;

    const sectionTitleStyle = `
        font-size: 1.2em; 
        font-weight: bold; 
        margin-top: 20px; 
        border-bottom: 1px solid #ccc; 
        padding-bottom: 5px;
        text-colour:rgb(8, 55, 84), 
    `;

    const listStyle = `
        margin: 10px 0; 
        padding-left: 20px;
    `;

    const personalInfoStyle = `
        text-align: center; 
        margin-bottom: 20px;
    `;

    const institutes = formData.getAll('institute[]');
    const degrees = formData.getAll('degree[]');
    const years = formData.getAll('eduYear[]');
    let educationHtml = '';
    for (let i = 0; i < institutes.length; i++) {
        educationHtml += `
            <li>
                <strong>${institutes[i]}</strong>, ${degrees[i]} (${years[i]})
            </li>`;
    }

    const companies = formData.getAll('company[]');
    const jobTitles = formData.getAll('jobTitle[]');
    const startYears = formData.getAll('expStart[]');
    const endYears = formData.getAll('expEnd[]');
    let experienceHtml = '';
    for (let i = 0; i < companies.length; i++) {
        experienceHtml += `
            <li>
                <strong>${companies[i]}</strong>: ${jobTitles[i]} (${startYears[i]} - ${endYears[i]})
            </li>`;
    }

    const certifications = formData.getAll('certification[]');
    const issuers = formData.getAll('certIssuer[]');
    const certYears = formData.getAll('certYear[]');
    let certificationHtml = '';
    for (let i = 0; i < certifications.length; i++) {
        certificationHtml += `
            <li>
                <strong>${certifications[i]}</strong> by ${issuers[i]} (${certYears[i]})
            </li>`;
    }

    const skills = formData.getAll('skills[]');
    let skillsHtml = '';
    skills.forEach(skill => {
        skillsHtml += `<li>${skill}</li>`;
    });

    const languages = formData.getAll('language[]');
    let languagesHtml = '';
    languages.forEach(language => {
        languagesHtml += `<li>${language}</li>`;
    });

    resumeContainer.innerHTML = `
        <div style="${containerStyle}">
            <div style="${headerStyle}">
                ${photoHtml}
                <h2>${formData.get('name')}</h2>
                <p style="${personalInfoStyle}">
                    Email: ${formData.get('email')}<br>
                    Phone: ${formData.get('contact')}<br>
                    Address: ${formData.get('address')}
                </p>
            </div>

            <p><strong>Objective:</strong> ${formData.get('objective')}</p>

            <h3 style="${sectionTitleStyle}">Education</h3>
            <ul style="${listStyle}">${educationHtml}</ul>

            <h3 style="${sectionTitleStyle}">Experience</h3>
            <ul style="${listStyle}">${experienceHtml}</ul>

            <h3 style="${sectionTitleStyle}">Certifications</h3>
            <ul style="${listStyle}">${certificationHtml}</ul>

            <h3 style="${sectionTitleStyle}">Skills</h3>
            <ul style="${listStyle}">${skillsHtml}</ul>

            <h3 style="${sectionTitleStyle}">Languages</h3>
            <ul style="${listStyle}">${languagesHtml}</ul>
        </div>
    `;
}

function generateResume(event: Event) {
    event.preventDefault(); // Prevent form submission

    const form = document.getElementById('resumeForm') as HTMLFormElement;
    const formData = new FormData(form);

    const photoFile = formData.get('photo') as File;
    const photoHtml = photoFile
        ? `<img src="${URL.createObjectURL(photoFile)}" alt="Profile Picture" style="width: 100px; height: 100px; object-fit: cover; border-radius: 50%; margin-bottom: 10px;" />`
        : '';

    const resumeContainer = document.getElementById('resumeContainer');
    if (resumeContainer) {
        populateResume(formData, photoHtml, resumeContainer);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('resumeForm');
    if (form) {
        form.addEventListener('submit', generateResume);
    }
});








