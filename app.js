function delay(milliseconds)
{
    	return new Promise(resolve => {setTimeout(resolve, milliseconds);});
}

function getRandomInt(max)
{
  	return Math.floor(Math.random() * max);
}

async function init()
{ 	
	var run = "false";
	const rand_m = getRandomInt(15) + 1;
	const rand_s = getRandomInt(58) + 1;
	var button = document.createElement("button");
	button.innerHTML = "Старт";
	button.setAttribute("style", "margin: 0 0 0 24px; border-radius: 40px; width: auto; height: auto; padding: 4px 10px; border: none; color: white; background-color: rgba(255,255,255,0.4); font-size: 15px;");
	var body = document.getElementsByClassName('menu-items-empty-li')[0];
	body.setAttribute("style", "height: 30px;");
	body.appendChild(button);
	button.addEventListener ("click", function()
	{
		if (run == "false")
		{
			button.innerHTML = "Стоп";
			run = "true";
			document.getElementById('timeman-background').click();
		}
		else
		{
			button.innerHTML = "Старт";
			run = "false";
		}
	});
	while (true)
	{
		if (run == "true")
		{
    				await delay(1666);
				const time_h = document.getElementsByClassName('tm-popup-notice-time')[0].children[0].innerText;
				const time_m = document.getElementsByClassName('tm-popup-notice-time')[0].children[1].innerText;
				const time_s = document.getElementsByClassName('tm-popup-notice-time')[0].children[2].innerText;
    				console.log("Current time is " + time_h + ":" + time_m + ":" + time_s);
				if (time_h >=9 && time_m > rand_m && time_s > rand_s)		
				{
					document.querySelector('.ui-btn.ui-btn-danger.ui-btn-icon-stop').click();
					await delay(999);
					document.querySelector('.popup-window-button.popup-window-button-decline').click();
					await delay(999);
					run = "false";
					button.innerHTML = "Старт";
				}
		}
		await delay(6666);
	}
	console.log("Script stopped");
}

console.log("Script started");
init();
