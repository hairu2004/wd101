function validateForm(event){
    event.preventDefault();
    let name=document.forms["user-form"]["name"].value;
    let email=document.forms["user-form"]["email"].value;
    let date = document.forms["user-form"]["dob"].value;
    let password=document.forms["user-form"]["password"].value;
    let atc=document.forms["user-form"]["acceptTerms"].checked;
    
    const dob = new Date(date);
    const age = (Date.now() - dob.getTime())/(1000*60*60*24*365.25);

    if(age<18 || age>55){
        alert("Please enter a date of birth for useres between 18 and 55 years old.");
        return;
    }
    let data = {name,email,password,date,atc};
    let user_entries = JSON.parse(localStorage.getItem("user_entries")) || [];
    if(!Array.isArray(user_entries)){
        user_entries=[];
    }
    user_entries.push(data);
    localStorage.setItem("user_entries", JSON.stringify(user_entries));
    displayEntries();
    event.target.reset();
}
const displayEntries = () => {
    // Retrieve user entries from localStorage or initialize an empty array
    let user_entries = JSON.parse(localStorage.getItem("user_entries")) || [];

    // Generate table headers
    const tableHeader = `
        <tr>
            <th class="px-4 py-2">Name</th>
            <th class="px-4 py-2">Email</th>
            <th class="px-4 py-2">Password</th>
            <th class="px-4 py-2">Dob</th>
            <th class="px-4 py-2">Accepted terms?</th>
        </tr>
    `;

    // Generate table rows if there are any entries
    const tableEntries = user_entries.map((entry) => {
        const nameCell = `<td class="border px-4 py-2">${entry.name}</td>`;
        const emailCell = `<td class="border px-4 py-2">${entry.email}</td>`;
        const passwordCell = `<td class="border px-4 py-2">${entry.password}</td>`;
        const dobCell = `<td class="border px-4 py-2">${entry.date}</td>`;
        const acceptTermsCell = `<td class="border px-4 py-2">${entry.atc ? 'true' : 'false'}</td>`;
        const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptTermsCell}</tr>`;
        return row;
    }).join("\n");

    // Create the full table, combining the header and rows
    const table = `
        <table class="table-auto w-full">
            ${tableHeader}
            ${tableEntries}
        </table>
    `;

    // Render the table into the "user_entries" div
    let details = document.getElementById("user_entries");
    details.innerHTML = table;
};

window.onload = function () {
    displayEntries();
};

window.onload=function(){
    displayEntries();
};