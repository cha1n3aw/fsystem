﻿var run = "false";
var rand_work_finish_h = 9;
var rand_work_finish_m = 1;
var rand_work_finish_s = 1;
var rand_abs_start_h = 7;
var rand_abs_start_m = 58;
var rand_abs_start_s = 1;
var max_abs_finish_h = 17;
var max_abs_finish_m = 30;
var startButton = document.createElement("button");
var timeInput = document.createElement("input");
const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

function delay(milliseconds)
{
    	return new Promise(resolve => {setTimeout(resolve, milliseconds);});
}

async function handleClick()
{
	if (run == "false")
	{
		startButton.setAttribute("style", "margin: 0 0 0 24px; border-radius: 40px; width: auto; height: auto; padding: 4px 10px; border: none; color: white; background-color: rgba(255,255,255,0.4); font-size: 15px;");							
		startButton.innerHTML = "Стоп";
		max_abs_finish_h = timeInput.value.split(":")[0];
		max_abs_finish_m = timeInput.value.split(":")[1];
		timeInput.disabled = true;
		var timemanBackground = document.getElementById('timeman-background');
		if (timemanBackground != null)
		{
			var timemanMain = document.getElementById('timeman_main');
			if (timemanMain == null)
			{
				document.getElementById('timeman-background').click();
				await delay(1666);
			}
			else if (getComputedStyle(timemanMain).display == "none")
			{
				document.getElementById('timeman-background').click();
				await delay(1666);
			}
			if (document.querySelector('.ui-btn.ui-btn-success.ui-btn-icon-start') != null)
			{
				awaiting_finish = "false";
				awaiting_start = "true";
				console.log("Script started, awaiting for work to start");
				run = "true";
			}
			else
			{
				if (document.querySelector('.ui-btn.ui-btn-danger.ui-btn-icon-stop') != null)
				{
					awaiting_finish = "true";
					awaiting_start = "false";
					randomize_work_finish_time();
					console.log("Script started, awaiting for work to finish");
					run = "true";
				}
				else
				{
					console.log("Failed to start script: unable to find start or stop buttons");
					run = "false";
				}
			}
		}
	}
	else
	{
		startButton.innerHTML = "Старт";
		startButton.setAttribute("style", "margin: 0 0 0 24px; border-radius: 40px; width: auto; height: auto; padding: 4px 10px; border: none; color: white; background-color: rgba(255,255,255,0.4); font-size: 15px;");							
		run = "false";
		timeInput.disabled = false;
		console.log("Script stopped");
	}
}

function getRandomInt(max, offset)
{
  	return Math.floor(Math.random() * max) + offset;
}

function randomize_work_finish_time()
{
	
	rand_work_finish_h = 9;
	rand_work_finish_m = getRandomInt(10, 20);
	rand_work_finish_s = getRandomInt(58, 1);
}

function randomize_abs_start_time()
{
	
	rand_abs_start_h = 7;
	rand_abs_start_m = getRandomInt(5, 54);
}

async function init()
{ 	
	startButton.innerHTML = "Старт";
	startButton.setAttribute("style", "margin: 0 0 0 24px; border-radius: 40px; width: auto; height: auto; padding: 4px 10px; border: none; color: white; background-color: rgba(255,255,255,0.4); font-size: 15px;");

	timeInput.setAttribute("style", "margin: 0 0 0 10px; border-radius: 40px; width: 75px; height: auto; padding: 4px 10px; border: none; color: white; background-color: rgba(255,255,255,0.4); font-size: 15px; type: time;");
	timeInput.setAttribute("type", "time");
	timeInput.value = max_abs_finish_h + ":" + max_abs_finish_m;	
	
	var body = document.getElementsByClassName('menu-items-empty-li')[0];
	body.setAttribute("style", "height: 30px;");
	
	var span = document.createElement("span");
	span.appendChild(startButton);
	span.appendChild(timeInput);
	body.appendChild(span);

	startButton.addEventListener ("click", handleClick);

	while (true)
	{
		if (run == "true")
		{
			var timemanBackground = document.getElementById('timeman-background');
			if (timemanBackground != null)
			{
				var timemanMain = document.getElementById('timeman_main');
				if (timemanMain == null)
				{
					document.getElementById('timeman-background').click();
					await delay(1666);
				}
				else
				{
					if (getComputedStyle(timemanMain).display == "none")
					{
						document.getElementById('timeman-background').click();
						await delay(1666);
					}
					else
					{	
						
						const currentDayOfWeek = new Date().getDay();
						const current_time_h = document.getElementsByClassName('time-hours')[0].innerText;
						const current_time_m = document.getElementsByClassName('time-minutes')[0].innerText;
						if (currentDayOfWeek != 0 && currentDayOfWeek != 6)
						{
							if (awaiting_finish == "true" && awaiting_start == "false")
							{
								const work_time_h = document.getElementsByClassName('tm-popup-notice-time')[0].children[0].innerText;
								const work_time_m = document.getElementsByClassName('tm-popup-notice-time')[0].children[1].innerText;
								const work_time_s = document.getElementsByClassName('tm-popup-notice-time')[0].children[2].innerText;
   								console.log("It's " + weekday[currentDayOfWeek] + ", " + current_time_h + ":" + current_time_m + ", cut-off time is " + max_abs_finish_h + ":" + max_abs_finish_m);
								console.log("Already working for " + work_time_h + ":" + work_time_m + ", target work time is " + rand_work_finish_h + ":" + rand_work_finish_m);
								var reportText = document.getElementsByClassName('tm-popup-report-textarea')[0].value;
								if (work_time_h >=rand_work_finish_h && work_time_m > rand_work_finish_m && work_time_s > rand_work_finish_s)		
								{
									if (reportText.length > 30)
									{
										document.querySelector('.ui-btn.ui-btn-danger.ui-btn-icon-stop').click();
										await delay(999);
										document.querySelector('.popup-window-button.popup-window-button-decline').click();
											await delay(999);
										startButton.innerHTML = "Старт";
										startButton.setAttribute("style", "margin: 0 0 0 24px; border-radius: 40px; width: auto; height: auto; padding: 4px 10px; border: none; color: white; background-color: rgba(255,255,255,0.4); font-size: 15px;");
										timeInput.disabled = false;
										awaiting_finish = "false";
										awaiting_start = "true";
										randomize_abs_start_time();
									}
									else
									{
										console.log("ALERT: EMPTY REPORT!");
										startButton.setAttribute("style", "margin: 0 0 0 24px; border-radius: 40px; width: auto; height: auto; padding: 4px 10px; border: none; color: white; background-color: rgba(255,0,0,0.4); font-size: 15px;");
										startButton.innerHTML = "Отчёт!";
									}
								}
								else if (max_abs_finish_h <= current_time_h && max_abs_finish_m <= current_time_m)
								{
									if (reportText.length > 30)
									{
										document.querySelector('.ui-btn.ui-btn-danger.ui-btn-icon-stop').click();
										await delay(999);
										document.querySelector('.popup-window-button.popup-window-button-decline').click();
										await delay(999);
										startButton.innerHTML = "Старт";
										startButton.setAttribute("style", "margin: 0 0 0 24px; border-radius: 40px; width: auto; height: auto; padding: 4px 10px; border: none; color: white; background-color: rgba(255,255,255,0.4); font-size: 15px;");
										timeInput.disabled = false;
										awaiting_finish = "false";
										awaiting_start = "true";
										randomize_abs_start_time();
									}
									else
									{
										console.log("ALERT: EMPTY REPORT!");
										startButton.setAttribute("style", "margin: 0 0 0 24px; border-radius: 40px; width: auto; height: auto; padding: 4px 10px; border: none; color: white; background-color: rgba(255,0,0,0.4); font-size: 15px;");
										startButton.innerHTML = "Отчёт!";
									}
								}
								await delay(16666);
							}
							else if (awaiting_start == "true" && awaiting_finish == "false")
							{
								
								const current_time_h = document.getElementsByClassName('time-hours')[0].innerText;
								const current_time_m = document.getElementsByClassName('time-minutes')[0].innerText;
								console.log("It's " + weekday[currentDayOfWeek] + ", " + current_time_h + ":" + current_time_m + ", work start is scheduled to " + rand_abs_start_h + ":" + rand_abs_start_m);
								if (current_time_h >= rand_abs_start_h && current_time_m >= rand_abs_start_m)
								{
									document.querySelector('.ui-btn.ui-btn-success.ui-btn-icon-start').click();
									await delay(999);
									awaiting_finish = "true";
									awaiting_start = "false";
									randomize_work_finish_time();
								}
								await delay(16666);
							}
							
						}
						else
						{
							console.log("It's " + weekday[currentDayOfWeek] + ", " + current_time_h + ":" + current_time_m + ", sleeping for 4 hours because of weekend...");
							await delay(14400000);
						}
					}
				}
			}
		}
		await delay(666);
	}
}

console.log("Script loaded");
init();
