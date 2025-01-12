function createField(sectionId, htmlContent) {
    var section = document.getElementById(sectionId);
    if (section) {
        var div = document.createElement('div');
        div.innerHTML = htmlContent;
        section.appendChild(div);
    }
}
//remove 
function removeField(button) {
    var _a;
    (_a = button.parentElement) === null || _a === void 0 ? void 0 : _a.remove();
}
function addEducation() {
    createField('education-section', "\n        <div>\n            <label>Institute Name:</label>\n            <input type=\"text\" name=\"institute[]\" required />\n            <label>Degree/Field:</label>\n            <input type=\"text\" name=\"degree[]\" required />\n            <label>Year:</label>\n            <input type=\"number\" name=\"eduYear[]\" required />\n            <button type=\"button\" class=\"remove-button\" onclick=\"removeField(this)\">-</button>\n        </div>\n        ");
}
function addExperience() {
    createField('experience-section', "\n        <div>\n            <label>Company Name:</label>\n            <input type=\"text\" name=\"company[]\" required />\n            <label>Job Title:</label>\n            <input type=\"text\" name=\"jobTitle[]\" required />\n            <label>Start Year:</label>\n            <input type=\"number\" name=\"expStart[]\" required />\n            <label>End Year:</label>\n            <input type=\"number\" name=\"expEnd[]\" required />\n            <button type=\"button\" class=\"remove-button\" onclick=\"removeField(this)\">-</button>\n        </div>\n        ");
}
function addCertification() {
    createField('certifications-section', "\n        <div>\n            <label>Certification Name:</label>\n            <input type=\"text\" name=\"certification[]\" required />\n            <label>Issued By:</label>\n            <input type=\"text\" name=\"certIssuer[]\" required />\n            <label>Year:</label>\n            <input type=\"number\" name=\"certYear[]\" required />\n            <button type=\"button\" class=\"remove-button\" onclick=\"removeField(this)\">-</button>\n        </div>\n        ");
}
function addSkill() {
    createField('skills-section', "\n        <div>\n            <input type=\"text\" name=\"skills[]\" placeholder=\"Enter a skill\" required />\n            <button type=\"button\" class=\"remove-button\" onclick=\"removeField(this)\">-</button>\n        </div>\n        ");
}
function addLanguage() {
    createField('languages-section', "\n        <div>\n            <input type=\"text\" name=\"language[]\" placeholder=\"Enter a language\" required />\n            <button type=\"button\" class=\"remove-button\" onclick=\"removeField(this)\">-</button>\n        </div>\n        ");
}
function populateResume(formData, photoHtml, resumeContainer) {
    var containerStyle = "\n        font-family: Arial, sans-serif; \n        margin: 20px auto; \n        padding: 20px; \n        border: 1px solid #ccc; \n        border-radius: 10px; \n        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); \n        max-width: 800px; \n        background-color:rgb(255, 255, 255); \n        color: #333;\n        line-height: 1.6;\n    ";
    var headerStyle = "\n        text-align: center; \n        margin-bottom: 20px;\n    ";
    var sectionTitleStyle = "\n        font-size: 1.2em; \n        font-weight: bold; \n        margin-top: 20px; \n        border-bottom: 1px solid #ccc; \n        padding-bottom: 5px;\n        text-colour:rgb(8, 55, 84), \n    ";
    var listStyle = "\n        margin: 10px 0; \n        padding-left: 20px;\n    ";
    var personalInfoStyle = "\n        text-align: center; \n        margin-bottom: 20px;\n    ";
    var institutes = formData.getAll('institute[]');
    var degrees = formData.getAll('degree[]');
    var years = formData.getAll('eduYear[]');
    var educationHtml = '';
    for (var i = 0; i < institutes.length; i++) {
        educationHtml += "\n            <li>\n                <strong>".concat(institutes[i], "</strong>, ").concat(degrees[i], " (").concat(years[i], ")\n            </li>");
    }
    var companies = formData.getAll('company[]');
    var jobTitles = formData.getAll('jobTitle[]');
    var startYears = formData.getAll('expStart[]');
    var endYears = formData.getAll('expEnd[]');
    var experienceHtml = '';
    for (var i = 0; i < companies.length; i++) {
        experienceHtml += "\n            <li>\n                <strong>".concat(companies[i], "</strong>: ").concat(jobTitles[i], " (").concat(startYears[i], " - ").concat(endYears[i], ")\n            </li>");
    }
    var certifications = formData.getAll('certification[]');
    var issuers = formData.getAll('certIssuer[]');
    var certYears = formData.getAll('certYear[]');
    var certificationHtml = '';
    for (var i = 0; i < certifications.length; i++) {
        certificationHtml += "\n            <li>\n                <strong>".concat(certifications[i], "</strong> by ").concat(issuers[i], " (").concat(certYears[i], ")\n            </li>");
    }
    var skills = formData.getAll('skills[]');
    var skillsHtml = '';
    skills.forEach(function (skill) {
        skillsHtml += "<li>".concat(skill, "</li>");
    });
    var languages = formData.getAll('language[]');
    var languagesHtml = '';
    languages.forEach(function (language) {
        languagesHtml += "<li>".concat(language, "</li>");
    });
    resumeContainer.innerHTML = "\n        <div style=\"".concat(containerStyle, "\">\n            <div style=\"").concat(headerStyle, "\">\n                ").concat(photoHtml, "\n                <h2>").concat(formData.get('name'), "</h2>\n                <p style=\"").concat(personalInfoStyle, "\">\n                    Email: ").concat(formData.get('email'), "<br>\n                    Phone: ").concat(formData.get('contact'), "<br>\n                    Address: ").concat(formData.get('address'), "\n                </p>\n            </div>\n\n            <p><strong>Objective:</strong> ").concat(formData.get('objective'), "</p>\n\n            <h3 style=\"").concat(sectionTitleStyle, "\">Education</h3>\n            <ul style=\"").concat(listStyle, "\">").concat(educationHtml, "</ul>\n\n            <h3 style=\"").concat(sectionTitleStyle, "\">Experience</h3>\n            <ul style=\"").concat(listStyle, "\">").concat(experienceHtml, "</ul>\n\n            <h3 style=\"").concat(sectionTitleStyle, "\">Certifications</h3>\n            <ul style=\"").concat(listStyle, "\">").concat(certificationHtml, "</ul>\n\n            <h3 style=\"").concat(sectionTitleStyle, "\">Skills</h3>\n            <ul style=\"").concat(listStyle, "\">").concat(skillsHtml, "</ul>\n\n            <h3 style=\"").concat(sectionTitleStyle, "\">Languages</h3>\n            <ul style=\"").concat(listStyle, "\">").concat(languagesHtml, "</ul>\n        </div>\n    ");
}
function generateResume(event) {
    event.preventDefault(); // Prevent form submission
    var form = document.getElementById('resumeForm');
    var formData = new FormData(form);
    var photoFile = formData.get('photo');
    var photoHtml = photoFile
        ? "<img src=\"".concat(URL.createObjectURL(photoFile), "\" alt=\"Profile Picture\" style=\"width: 100px; height: 100px; object-fit: cover; border-radius: 50%; margin-bottom: 10px;\" />")
        : '';
    var resumeContainer = document.getElementById('resumeContainer');
    if (resumeContainer) {
        populateResume(formData, photoHtml, resumeContainer);
    }
}
document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('resumeForm');
    if (form) {
        form.addEventListener('submit', generateResume);
    }
});
