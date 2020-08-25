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


$('#container3').hide()


$('form').on('submit', (event)=> {
        event.preventDefault();
        $('#logo').remove()
        $('#team').remove()
        $('.incoming-class').empty()
    
        let userInput = $('input[type="text"]').val()
        let userYear = $('#year').val()
        
    $.ajax({
        url:`https://api.collegefootballdata.com/teams`,
    }).then(
        (data)=>{
            for (const object of data) {
                if (object.school === userInput){
                    team = object
                    const $newh1 = $('<h1 id="team">')
                    $newh1.text(`${team.school} ${team.mascot}`)
                    $('#container2').prepend($newh1);
                    $('#container2').prepend(`<img id="logo" src="${team.logos[1]}" width="250px">`);
                    $('#container2').css('background', `linear-gradient(-100deg, ${team.color} 80%, ${team.alt_color} 80%)`)
                    getSchedule(team, userYear)
                    getIncomingClass(team, userYear)
                    getRoster(team, userYear)
                    $('#container3').accordion({
                        heightStyle: "content",
                        collapsible: true,
                        active: false,
                    })
                    $('#container3').show()
                } else {
                }
            }
        },
        ()=>{
            console.log('bad request');
        }
    );
    
    })


const getSchedule = (team,year) => {
    if (team.school === "Texas A&M"){
        team.school = "Texas%20A%26M"
    } else {
    }
    $.ajax({
        url:`https://api.collegefootballdata.com/games?year=${year}&seasonType=regular&team=${team.school}`,
            
    }).then(
        (data)=>{
            for (const object of data) {
                const $newLi = $('<li id="game">')
                let gameDate = object.start_date.substring(5,10)
                $newLi.text(`${object.away_team} at ${object.home_team}, ${gameDate}`)
                $('.schedule').append($newLi);
                
            }
        },
        ()=>{
            console.log('bad request');
        }
    );
    }


const getIncomingClass = (team, year) => {
    let lowerTeam = team.school.toLowerCase()
    lowerTeam = lowerTeam.replace("%20", " ")
    lowerTeam = lowerTeam.replace(/[^a-zA-Z ]/g, "")
    lowerTeam = lowerTeam.replace(/ /g, "-");

    const $newA = $(`<a href="https://247sports.com/college/${lowerTeam}/Season/${year}-Football/Commits/">`);
    const $newButton = $('<button id="twofourseven-sports">')
    $newButton.text('247 Sports Page')
    $('.incoming-class').append($newA)
    $newA.append($newButton)
        $.ajax({
            url:`https://api.collegefootballdata.com/recruiting/players?year=${year}&classification=HighSchool&team=${team.school}`,
        }).then(
            (data)=>{
                for (const object of data) {
                    const $newLi = $('<li id="recruit">')
                    $newLi.text(`${object.name}, ${object.position}, Rating: ${object.rating}, ${object.city}, ${object.stateProvince}`)
                    $('.incoming-class').append($newLi);
                }
            },
            ()=>{
                console.log('bad request');
            }
        );

        }

const getRoster = (team, year) => {
        $.ajax({
            url:`https://api.collegefootballdata.com/roster?team=${team.school}&year=${year-1}`,
        }).then(
            (data)=>{
                for (const object of data) {
                    const $newLi = $('<li id="player">')
                    $newLi.text(`${object.first_name} ${object.last_name}, ${object.position}, #${object.jersey}, Year: ${object.year}`)
                    $('.roster').append($newLi);
                }
            },
            ()=>{
                console.log('bad request');
            }
        );
        }

//get teamRecord