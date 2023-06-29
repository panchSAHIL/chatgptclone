async function postData(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
     
      headers: {
        "Content-Type": "application/json",
        
      },
        body: JSON.stringify(data), 
    });
    return response.json(); 
  }


sendbutton.addEventListener("click", async ()=>{
    questionInput=document.getElementById("chat-input").value;
    document.getElementById("chat-input").value="";
    document.querySelector(".right2").style.display="block";
    document.querySelector(".right1").style.display="none";

    question.innerHTML=questionInput;

    //get the naswer and popullate
    let result=await postData("/api",{"question":questionInput})
    let questionsol=result.answer;
    questionsol.replace('<','&lt;');
    questionsol.replace('>','&gt;');
    solution.innerHTML=questionsol.toString();
    console.log(questionsol);

})

newchat.addEventListener("click", async ()=>{
  document.getElementById("chat-input").value="";
  document.querySelector(".right2").style.display="none";
  document.querySelector(".right1").style.display="";
})


sendbutton2.addEventListener("click", async ()=>{
  questionInput=document.getElementById("chat2-input").value;
  document.getElementById("chat2-input").value="";
  
  document.querySelector(".right2").style.display="block";
  document.querySelector(".right1").style.display="none";
  question.innerHTML=questionInput;
  solution.innerHTML="Loading...";



  //get the naswer and popullate
  let result=await postData("/api",{"question":questionInput})
  solution.innerHTML=result.answer

})



function adjustTextareaHeight() {
  var textarea = document.getElementById('sendbutton');
  
  // var lineHeight = parseInt(getComputedStyle(textarea).lineHeight);
  // var lines=Math.ceil(textarea.scrollHeight / lineHeight);
  var previousHeight = textarea.style.height;

  // console.log(textarea.scrollHeight, textarea.style.height,lineHeight,lines);

  // textarea.style.height = 'auto'; 
  var newHeight = textarea.scrollHeight;
  textarea.style.height = newHeight + 'px';
  if (newHeight > parseInt(previousHeight)) {
      textarea.style.height = previousHeight;
  }



  if (textarea.value === '') {
      textarea.style.height = '55px'; // Set the initial height here
  }

  if (textarea.scrollHeight > 55) {
      //  if(textarea.style.height<200){
      //    textarea.style.height = textarea.scrollHeight + 'px';
      //    return;
      // }
      textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
  }
}



function adjustTextareaHeight2() {
  var textarea = document.getElementById('chat2-input');
  
  // var lineHeight = parseInt(getComputedStyle(textarea).lineHeight);
  // var lines=Math.ceil(textarea.scrollHeight / lineHeight);
  var previousHeight = textarea.style.height;

  // console.log(textarea.scrollHeight, textarea.style.height,lineHeight,lines);

  // textarea.style.height = 'auto'; 
  var newHeight = textarea.scrollHeight;
  textarea.style.height = newHeight + 'px';
  if (newHeight > parseInt(previousHeight)) {
      textarea.style.height = previousHeight;
  }



  if (textarea.value === '') {
      textarea.style.height = '55px'; // Set the initial height here
  }

  if (textarea.scrollHeight > 55) {
      //  if(textarea.style.height<200){
      //    textarea.style.height = textarea.scrollHeight + 'px';
      //    return;
      // }
      textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
  }
}

