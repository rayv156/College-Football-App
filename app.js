let team

///hiding prewritten contents

$('#container31').hide()
$('#team-info2').hide()


const $openBtn = $('#openModal');
const $modal = $('#modal');
const $closeBtn = $('#close');
const openModal = () => {
  $modal.css('display', 'block')
}
const closeModal = () => {
  $modal.css('display', 'none')
}
setTimeout(openModal, 1000);
// Event Listeners
$openBtn.on('click', openModal)
$closeBtn.on('click', closeModal)

//////////////////////////////
/////FUNCTIONS
/////////////////////////////


//=========LOADING FIRST TEAM ON FORM SUBMISSION=================

$('form').on('submit', (event)=> {
        event.preventDefault();
        $('hr').remove()
        $('#quick-link').remove()
        $('#home-page-links').hide()
        $('.incoming-class').empty()
        $('.roster').empty()
        $('.schedule').empty()
        $('.metrics').empty()
        $('#container21').empty()
        $('#container31').hide()
        $('#team-info2').hide()
        $('#team-info1').css('width', '100%')
        let userInput = $('input[type="text"]').val()

        let userYear = $('#year').val()
    
        loadData(userInput,1,userYear)
    
    })

//==========FUNCTION FOR GETTING SCHEDULE OF TEAM==================
//CONTAINS THE VIEW MATCHUP BUTTON WRAPPED IN THE FUNCTION TO CALL BACK THE LOAD DATA FUNCTION IN ORDER TO LOAD THE SECOND TEAM ON CLICK

const getSchedule = (team,a,year) => {
    if (team.school === "Texas A&M"){
        team.school = "Texas%20A%26M" //HARD CODING THIS SCHOOLS ODD URL
    } else {
    }
    $.ajax({
        url:`https://api.collegefootballdata.com/games?year=${year}&seasonType=regular&team=${team.school}`,
            
    }).then(
        (data)=>{
            if (team.school === "Texas%20A%26M"){
                team.school = "Texas A&M"
            }else{
            }
            $('#schedule2').empty()
            for (let i=0; i<data.length; i++) {
                let object = data[i]
                const $newDiv = $(`<div class="game" id="game${i}">`) //ADDING NEW DIV FOR EACH GAME
                let gameDate = object.start_date.substring(5,10) //PULLING THE LAST 5 CHARACTERS FROM THE START_DATE DUE TO IT'S FORMAT
                const $newDiv1 = $('<div class="matchup">') //ADDING NEW DIV INSIDE .GAME
                if (object.home_points === null && object.away_points === null){
                    object.home_points = "";
                    object.away_points = "";
                }
                $newDiv1.text(`${object.away_team}` + " " + `${object.away_points} at ${object.home_team}` + ` ${object.home_points + "  -   " + gameDate.replace(/-/g, "/")}`)
                $(`#schedule${a}`).append($newDiv);
                $newDiv.append($newDiv1)

                if (a===1){//IF STATMENT TO DETERMINE IF THIS TEAM IS THE MAIN TEAM OR THE SECOND TEAM THAT POPS UP UPON VIEW MATCHUP CLICK, MAKING SURE THE VIEW MATCHUP IS NOT ADDED TO THE SECOND TEAM
                    if (object.away_team === team.school){//CONDITION TO CHECK WHICH TEAM TO LOAD FROM THE MATCHUP
                    let teamB = object.home_team
                    const $matchupButton = $(`<button class="view-matchup${i}" id="${teamB}">`) //CREATING VIEW MATCHUP BUTTON
                    $matchupButton.text('View Matchup')
                    $newDiv.append($matchupButton)
                    //VIEW MATCHUPS FUNCTION ON CLICK
                    $(`.view-matchup${i}`).on('click', (event) => {
                        
                        $('#content').css('flex-direction', 'row')//ADJUSTING CONTENT TO MAKE ROOM AND ALIGN CORRECTLY FOR THE SECOND TEAM
                        $('#team-info1').css('width', '50%')
                        $('#team-info2').show()//SHOWING PREVIOUSLY HIDDEN HTML CONTENT FOR SECOND TEAM
                        const $closeButton = $(`<button class="close-button">`) //CREATING CLOSE BUTTON ON SECOND TEAM
                        $closeButton.text('X')
                        $('#team-info2').append($closeButton)
                        loadData($(event.currentTarget).attr('id'),2,year)  //CALLING LOAD DATA WHEN CLICKING VIEW MATCHUP
                            $closeButton.on('click', () => { //CLOSE BUTTON CLICK EVENT TO HIDE AND EMPTY ALL NECESSARY COMPONENTS FOR THE SECOND TEAM
                                $('#roster2').empty()
                                $('#schedule2').empty()
                                $('#incomingclass2').empty()
                                $('#metrics2').empty()
                                $('#container22').empty()
                                $('#team-info2').hide()
                                $('#team-info1').css('width', '100%')
                        })
                    })
                    } else if (object.home_team === team.school){//CONDITION TO CHECK WHICH TEAM TO LOAD FROM THE MATCHUP
                    let teamB = object.away_team
                    const $matchupButton = $(`<button class="view-matchup${i}" id="${teamB}">`)//CREATING VIEW MATCHUP BUTTON
                    $matchupButton.text('View Matchup')
                    $newDiv.append($matchupButton)
                    //VIEW MATCHUPS FUNCTION ON CLICK
                    $(`.view-matchup${i}`).on('click', (event) => {
                        $('#roster2').empty()
                        $('#content').css('flex-direction', 'row')//ADJUSTING CONTENT TO MAKE ROOM AND ALIGN CORRECTLY FOR THE SECOND TEAM
                        $('#team-info1').css('width', '50%')
                        $('#team-info2').show()//SHOWING PREVIOUSLY HIDDEN HTML CONTENT FOR SECOND TEAM
                        const $closeButton = $(`<button class="close-button">`) //CREATING CLOSE BUTTON ON SECOND TEAM
                        $closeButton.text('X')
                        $('#team-info2').append($closeButton)
                        loadData($(event.currentTarget).attr('id'),2,year)//CALLING LOAD DATA WHEN CLICKING VIEW MATCHUP
                            $closeButton.on('click', () => {//CLOSE BUTTON CLICK EVENT TO HIDE AND EMPTY ALL NECESSARY COMPONENTS FOR THE SECOND TEAM
                                $('#roster2').empty()
                                $('#schedule2').empty()
                                $('#incomingclass2').empty()
                                $('#metrics2').empty()
                                $('#container22').empty()
                                $('#team-info2').hide()
                                $('#team-info1').css('width', '100%')
                            })
                    })

                }
                } else{
                }
            }
                            
        },
        ()=>{
            console.log('bad request');
        }
    );
    }

//============GET THE INCOMING RECRUITING CLASS FROM THE API

const getIncomingClass = (team,a, year) => {
    let lowerTeam = team.school.toLowerCase()
    lowerTeam = lowerTeam.replace("%20", " ")
    lowerTeam = lowerTeam.replace(/[^a-zA-Z ]/g, "")
    lowerTeam = lowerTeam.replace(/ /g, "-");

    const $newA = $(`<a href="https://247sports.com/college/${lowerTeam}/Season/${year}-Football/Commits/">`);
    const $newButton = $('<button id="twofourseven-sports">')
    $newButton.text('247 Sports Page')
    $(`#incoming-class${a}`).append($newA)
    $newA.append($newButton)
        $.ajax({
            url:`https://api.collegefootballdata.com/recruiting/players?year=${year}&classification=HighSchool&team=${team.school}`,
        }).then(
            (data)=>{
                for (const object of data) {
                    const $newLi = $('<li class="recruit">')
                    $newLi.text(`${object.name}, ${object.position}, Rating: ${object.rating}, ${object.city}, ${object.stateProvince}`)
                    $(`#incoming-class${a}`).append($newLi);
                }
            },
            ()=>{
                console.log('bad request');
            }
        );

        }


//==========GETS THE CURRENT ROSTER==================

const getRoster = (team,a, year) => {
        $.ajax({
            url:`https://api.collegefootballdata.com/roster?team=${team.school}&year=${year}`,
        }).then(
            (data)=>{
                for (const object of data) {
                    const $newLi = $('<li class="player">')  //CREATING NEW LIST ITEM FOR EACH PLAYER
                    $newLi.text(`${object.first_name} ${object.last_name}, ${object.position}, #${object.jersey}, Year: ${object.year}`)
                    $(`#roster${a}`).append($newLi);
                }
            },
            ()=>{
                console.log('bad request');
            }
        );
        }


//===========RUNNING ALL THE GET FUNCTIONS TO GATHER ALL THE TEAM'S INFORMATION IN ONE CALL

const getTeamInfo = (team,a,userYear) => {
    getSchedule(team,a, userYear)
    getIncomingClass(team,a, userYear)
    getRoster(team,a, userYear)
    getMetrics(team,a,userYear)
    $(`#container3${a}`).accordion({
        heightStyle: "content",
        collapsible: true,
        active: false,
    })
    $(`#container3${a}`).show()
}



const getMetrics = (team, a, year) => {
    $.ajax({
    url:`https://api.collegefootballdata.com/player/returning?year=${year}&team=${team.school}`,
}).then(
    (data)=>{
        for (const object of data) {
            
            const $newMetric = $('<li class="metric">')  //CREATING NEW LIST ITEM FOR EACH METRIC
            $newMetric.text(`Percent PPA: ${object.percentPPA}`)
            $(`#metrics${a}`).append($newMetric);
            const $newMetric1 = $('<li class="metric">')  //CREATING NEW LIST ITEM FOR EACH METRIC
            $newMetric1.text(`Percent Passing PPA: ${object.percentPassingPPA}`)
            $(`#metrics${a}`).append($newMetric1);
            const $newMetric2 = $('<li class="metric">')  //CREATING NEW LIST ITEM FOR EACH METRIC
            $newMetric2.text(`Percent Receiving PPA: ${object.percentReceivingPPA}`)
            $(`#metrics${a}`).append($newMetric2);
            const $newMetric3 = $('<li class="metric">')  //CREATING NEW LIST ITEM FOR EACH METRIC
            $newMetric3.text(`Percent Rushing PPA: ${object.percentRushingPPA}`)
            $(`#metrics${a}`).append($newMetric3);
            const $newMetric4 = $('<li class="metric">')  //CREATING NEW LIST ITEM FOR EACH METRIC
            $newMetric4.text(`Usage: ${object.usage}`)
            $(`#metrics${a}`).append($newMetric4);
            const $newMetric5 = $('<li class="metric">')  //CREATING NEW LIST ITEM FOR EACH METRIC
            $newMetric5.text(`Passing Usage: ${object.passingUsage}`)
            $(`#metrics${a}`).append($newMetric5);
            const $newMetric6 = $('<li class="metric">')  //CREATING NEW LIST ITEM FOR EACH METRIC
            $newMetric6.text(`Receiving Usage: ${object.receivingUsage}`)
            $(`#metrics${a}`).append($newMetric6);
            const $newMetric7 = $('<li class="metric">')  //CREATING NEW LIST ITEM FOR EACH METRIC
            $newMetric7.text(`Rushing Usage: ${object.rushingUsage}`)
            $(`#metrics${a}`).append($newMetric7);

        }
    },
    ()=>{
        console.log('bad request');
    }
);
}


const loadData = (team,a,year) => {
    

$.ajax({
    url:`https://api.collegefootballdata.com/teams`,
}).then(
    (data)=>{
        for (let i=0; i<data.length; i++) {
            let object = data[i]
            if (object.school === team){
                team = object
                $('#container22').empty()
                $('#incoming-class2').empty()
                $('#metrics2').empty()
                const $newh1 = $('<h1 class="team">')  //ADDING H1 WITH EACH TEAM NAME AND MASCOT
                $newh1.text(`${team.school} ${team.mascot}`)
                $(`#container2${a}`).prepend($newh1);
                const $newImage = $(`<img class="logo" id="logo${i}" src="${team.logos[1]}">`)  //ADDING EACH TEAM'S LOGO
                $(`#container2${a}`).prepend($newImage);
                $(`#container2${a}`).css('background', `linear-gradient(-100deg, ${team.color} 80%, ${team.alt_color} 80%)`)
                getTeamInfo(team,a,year)
            } else {
            }
        }
    },
    ()=>{
        console.log('bad request');
    }
);
}

