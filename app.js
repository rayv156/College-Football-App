let team

// const $openBtn = $('#openModal');
// const $modal = $('#modal');
// const $closeBtn = $('#close');
// const openModal = () => {
//   $modal.css('display', 'block')
// }
// const closeModal = () => {
//   $modal.css('display', 'none')
// }
// setTimeout(openModal, 1000);
// // Event Listeners
// $openBtn.on('click', openModal)
// $closeBtn.on('click', closeModal)


$('#container31').hide()
$('#team-info2').hide()


$('form').on('submit', (event)=> {
        event.preventDefault();
        // $('#logo').remove()
        // $('#team').remove()
        $('.incoming-class').empty()
        $('.roster').empty()
        $('.schedule').empty()
        $('#container21').empty()
        $('#container31').hide()
        $('#team-info2').hide()
        $('#team-info1').css('width', '100%')
        let userInput = $('input[type="text"]').val()
        let userYear = $('#year').val()
    
        loadData(userInput,1,userYear)
    
    })


const getSchedule = (team,a,year) => {
    if (team.school === "Texas A&M"){
        team.school = "Texas%20A%26M"
    } else {
    }
    $.ajax({
        url:`https://api.collegefootballdata.com/games?year=${year}&seasonType=regular&team=${team.school}`,
            
    }).then(
        (data)=>{
            $('#schedule2').empty()
            for (let i=0; i<data.length; i++) {
                let object = data[i]
                const $newDiv = $(`<div class="game" id="game${i}">`)
                let gameDate = object.start_date.substring(5,10)
                const $newDiv1 = $('<div class="matchup">')
                $newDiv1.text(`${object.away_team} at ${object.home_team + "  -   " + gameDate.replace(/-/g, "/")}`)
                $(`#schedule${a}`).append($newDiv);
                $newDiv.append($newDiv1)

                if (a===1){
                    if (object.away_team === team.school){
                    let teamB = object.home_team
                    const $matchupButton = $(`<button class="view-matchup${i}" id="${teamB}">`)
                    $matchupButton.text('View Matchup')
                    $newDiv.append($matchupButton)
                    $(`.view-matchup${i}`).on('click', (event) => {
                        
                        $('#content').css('flex-direction', 'row')
                        $('#team-info1').css('width', '50%')
                        $('#team-info2').show()
                        console.log($(event.currentTarget))
                        const $closeButton = $(`<button class="close-button">`)
                        $closeButton.text('X')
                        $('#team-info2').append($closeButton)
                        loadData($(event.currentTarget).attr('id'),2,year)
                            $closeButton.on('click', () => {
                                $('#roster2').empty()
                                $('#schedule2').empty()
                                $('#incomingclass2').empty()
                                $('#container22').empty
                                $('#team-info2').hide()
                                $('#team-info1').css('width', '100%')
                        })
                    })
                    } else if (object.home_team === team.school){
                    let teamB = object.away_team
                    const $matchupButton = $(`<button class="view-matchup${i}" id="${teamB}">`)
                    $matchupButton.text('View Matchup')
                    $newDiv.append($matchupButton)
                    $(`.view-matchup${i}`).on('click', (event) => {
                        $('#roster2').empty()
                        $('#content').css('flex-direction', 'row')
                        $('#team-info1').css('width', '50%')
                        $('#team-info2').show()
                        const $closeButton = $(`<button class="close-button">`)
                        $closeButton.text('X')
                        $('#team-info2').append($closeButton)
                        loadData($(event.currentTarget).attr('id'),2,year)
                            $closeButton.on('click', () => {
                                $('#roster2').empty()
                                $('#schedule2').empty()
                                $('#incomingclass2').empty()
                                $('#container22').empty
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

const getRoster = (team,a, year) => {
        $.ajax({
            url:`https://api.collegefootballdata.com/roster?team=${team.school}&year=${year-1}`,
        }).then(
            (data)=>{
                for (const object of data) {
                    const $newLi = $('<li class="player">')
                    $newLi.text(`${object.first_name} ${object.last_name}, ${object.position}, #${object.jersey}, Year: ${object.year}`)
                    $(`#roster${a}`).append($newLi);
                }
            },
            ()=>{
                console.log('bad request');
            }
        );
        }

const getTeamInfo = (team,a,userYear) => {
    getSchedule(team,a, userYear)
    getIncomingClass(team,a, userYear)
    getRoster(team,a, userYear)
    $(`#container3${a}`).accordion({
        heightStyle: "content",
        collapsible: true,
        active: false,
    })
    $(`#container3${a}`).show()
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
                
                const $newh1 = $('<h1 class="team">')
                $newh1.text(`${team.school} ${team.mascot}`)
                $(`#container2${a}`).prepend($newh1);
                const $newImage = $(`<img class="logo" id="logo${i}" src="${team.logos[1]}">`)
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
