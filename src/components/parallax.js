
    let yard1=document.getElementById ('yard1');
    let typer=document.getElementById ('typer');
    let yard2=document.getElementById ('yard2');
    let sect=document.getElementById ('sect');
    window.addEventListener('scroll',function(){
        let value=window.scrollY;
        yard1.style.left=value*0.25+'px';
        yard2.style.top=value*1.05+'px';
    })
