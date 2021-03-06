// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyB0JUQygkgIhbJYhuhOHI55NUb-EX2IPiQ",
    authDomain: "course-collector.firebaseapp.com",
    databaseURL: "https://course-collector.firebaseio.com",
    projectId: "course-collector",
    storageBucket: "course-collector.appspot.com",
    messagingSenderId: "507836726245",
    appId: "1:507836726245:web:71aee9f8d80ea4a04dcd0c",
    measurementId: "G-Y0RDSR399J"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

    // Initializing database instance's
  const dbRef = firebase.database().ref();
  const coursesRef = dbRef.child('CoursesData');

  let btnAddCourse = document.getElementById("btnAddCourse");
  let tableBody = document.getElementById("tableBody");

  $(function() {
    $(".preload").fadeOut(1500, function() {
        $(".content").fadeIn(500);        
    });
  });

  window.onload = function() {
  coursesRef.on('value', coursesData => {
    coursesData.forEach(snap => {
      let courseInfo = snap.val();
      let tableRow =  document.createElement("tr");
      let td1 = document.createElement("td");
      td1.innerHTML = courseInfo.courseName; 
      let td2 = document.createElement("td");
      td2.innerHTML = courseInfo.courseInstructor; 
      let td3 = document.createElement("td");
      td3.innerHTML = courseInfo.courseLink;
      tableRow.appendChild(td1);
      tableRow.appendChild(td2);
      tableRow.appendChild(td3); 
      tableBody.appendChild(tableRow);
      });
  })
  };
  

  // sending data to firebase
  function addCourse() {
    let cName = document.getElementById("courseName").value;
    let cInstructor = document.getElementById("courseInstructor").value;
    let cLink = document.getElementById("courseLink").value;
    if(cName == "" || cInstructor == "" || cLink == "")
    {
        M.toast({html: 'Please fill all fields to Continue!', classes: 'rounded'});
    }
    else
    {
        let courseData = {
            courseName : cName,
            courseInstructor : cInstructor,
            courseLink : cLink
        };
        coursesRef.push(courseData);
        M.toast({html: 'Course Saved!', classes: 'rounded'});
        location.reload();
        return false;
    }
  }

  btnAddCourse.addEventListener('click', addCourse);

  