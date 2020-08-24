let team

$('#container3').hide()


$('form').on('submit', (event)=> {
        event.preventDefault();
        $('#logo').remove()
        $('#team').remove()
        $('li').empty()
        let userInput = $('input[type="text"]').val()
        
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
                    getSchedule(team)
                    getIncomingClass(team)
                    getRoster(team)
                    $('#container3').accordion({
                        heightStyle: "content",
                        collapsible: true,
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


const getSchedule = (team) => {
    if (team.school === "Texas A&M"){
        team.school = "Texas%20A%26M"
    } else {
    }
    $.ajax({
        url:`https://api.collegefootballdata.com/games?year=2020&seasonType=regular&team=${team.school}`,
            
    }).then(
        (data)=>{
            for (const object of data) {
                const $newLi = $('<li id="game">')
                $newLi.text(`${object.away_team} at ${object.home_team}`)
                $('.schedule').append($newLi);
                
            }
        },
        ()=>{
            console.log('bad request');
        }
    );
    }


const getIncomingClass = (team) => {
        $.ajax({
            url:`https://api.collegefootballdata.com/recruiting/players?year=2020&classification=HighSchool&team=${team.school}`,
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

const getRoster = (team) => {
        $.ajax({
            url:`https://api.collegefootballdata.com/roster?team=${team.school}&year=2019`,
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