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

	const rand_h = 9;
	const rand_m = getRandomInt(15) + 1;
	const rand_s = getRandomInt(58) + 1;
	var max_abs_time_h = 17;
	var max_abs_time_m = 30;

	var startButton = document.createElement("button");
	startButton.innerHTML = "Старт";
	startButton.setAttribute("style", "margin: 0 0 0 24px; border-radius: 40px; width: auto; height: auto; padding: 4px 10px; border: none; color: white; background-color: rgba(255,255,255,0.4); font-size: 15px;");
	
	var timeInput = document.createElement("input");
	timeInput.setAttribute("style", "margin: 0 0 0 10px; border-radius: 40px; width: 75px; height: auto; padding: 4px 10px; border: none; color: white; background-color: rgba(255,255,255,0.4); font-size: 15px; type: time;");
	timeInput.setAttribute("type", "time");
	timeInput.value = max_abs_time_h + ":" + max_abs_time_m;	
	
	var body = document.getElementsByClassName('menu-items-empty-li')[0];
	body.setAttribute("style", "height: 30px;");
	
	var span = document.createElement("span");
	span.appendChild(startButton);
	span.appendChild(timeInput);
	body.appendChild(span);

	startButton.addEventListener ("click", function()
	{
		if (run == "false")
		{
			startButton.innerHTML = "Стоп";
			run = "true";
			document.getElementById('timeman-background').click();
			max_abs_time_h = timeInput.value.split(":")[0];
			max_abs_time_m = timeInput.value.split(":")[1];
			console.log("Script started, absolute cut-off time is " + max_abs_time_h + ":" + max_abs_time_m + ", work cut-off time is " + rand_h + ":" + rand_m + ":" + rand_s);
			timeInput.disabled = true;
		}
		else
		{
			startButton.innerHTML = "Старт";
			run = "false";
			timeInput.disabled = false;
			console.log("Script stopped");
		}
	});
	while (true)
	{
		if (run == "true")
		{
			await delay(1666);
			const current_time_h = document.getElementsByClassName('time-hours')[0].innerText;
			const current_time_m = document.getElementsByClassName('time-minutes')[0].innerText;
			const work_time_h = document.getElementsByClassName('tm-popup-notice-time')[0].children[0].innerText;
			const work_time_m = document.getElementsByClassName('tm-popup-notice-time')[0].children[1].innerText;
			const work_time_s = document.getElementsByClassName('tm-popup-notice-time')[0].children[2].innerText;
   			console.log("Current time is " + current_time_h + current_time_m + ", work time is " + work_time_h + ":" + work_time_m);
			if (work_time_h >=rand_h && work_time_m > rand_m && work_time_s > rand_s)		
			{
				document.querySelector('.ui-btn.ui-btn-danger.ui-btn-icon-stop').click();
				await delay(999);
				document.querySelector('.popup-window-startButton.popup-window-startButton-decline').click();
				await delay(999);
				run = "false";
				startButton.innerHTML = "Старт";
				timeInput.disabled = false;
			}
			else if (max_abs_time_h <= current_time_h && max_abs_time_m <= current_time_m)
			{
				document.querySelector('.ui-btn.ui-btn-danger.ui-btn-icon-stop').click();
				await delay(999);
				document.querySelector('.popup-window-startButton.popup-window-startButton-decline').click();
				await delay(999);
				run = "false";
				startButton.innerHTML = "Старт";
				timeInput.disabled = false;
			}
			await delay(6666);
		}
		await delay(99);
	}
}

console.log("Script loaded");
init();
