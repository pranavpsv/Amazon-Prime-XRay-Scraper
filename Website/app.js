const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const csv=require('csvtojson')
// const csvFilePath='<path to csv file>'
// const jsonArray=await csv().fromFile(csvFilePath);
var jsonArray = "";
var moviesList = ['24Kisses_xray', 'Alpha_xray', 'American_Pie_Presents_The_Naked_Mile_Unrated_xray', 'American_Pie_xray', 'Annabelle_Creation_xray', 'Annabelle_xray', 'Atlas_Shrugged_Part_I_xray', 'A_Quiet_Place_xray', 'Bad_Boys_II_xray', 'Bazaar_xray', 'Beiimaan_Love_xray', 'Bharat_Ane_Nenu_xray', 'Calendar_Girls_xray', 'Chasing_Happiness_xray', 'Chitralahari_xray', 'Coldplay_A_Head_Full_Of_Dreams_xray', 'Conjuring_The_xray', 'Crazy_Rich_Asians_xray', 'Cruel_Intentions_xray', 'Deep_Blue_Sea_xray', 'Ernest_Goes_to_School_xray', 'Escape_Room_xray', 'Evil_Dead_xray', 'F2_Fun_and_Frustration_xray', 'Gangs_of_Wasseypur_Part_xray', 'Generation_Wealth_xray', 'Goosebumps_xray', 'Guava_Island_xray', 'Gully_Boy_xray', 'Harry_Potter_and_the_Chamber_of_Secrets_xray', 'Harry_Potter_and_the_Prisoner_of_Azkaban_xray', 'Harry_Potter_and_the_Sorcerer_s_Stone_xray', 'Hera_Pheri_xray', 'Hindi_xray', 'Imaikkaa_Nodigal_xray', 'Insidious_Chapter_xray', 'Insidious_The_Last_Key_xray', 'I_Am_Legend_xray', 'Jamba_Lakidi_Pamba_xray', 'Journey_The_Mysterious_Island_xray', 'Jumanji_Welcome_To_The_Jungle_xray', 'Jurassic_Park_III_xray', 'KAALA_Tamil_xray', 'Kavaludaari_xray', 'Kumbalangi_Nights_xray', 'Lady_Tiger_xray', 'La_La_Land_xray', 'Like_Crazy_xray', 'Little_Manhattan_xray', 'Love_Other_Drugs_xray', 'Lucifer_Malayalam_xray', 'Lucifer_Tamil_xray', 'Lucifer_Telugu_xray', 'Maatr_xray', 'Maharshi_xray', 'Majili_xray', 'Make_Us_Dream_xray', 'Mama_xray', 'Manikarnika_The_Queen_of_Jhansi_xray', 'Mithai_xray', 'Mohalla_Assi_xray', 'Monster_xray', 'Muklawa_xray', 'NGK_xray', 'No_Strings_Attached_xray', 'Nuvvu_Thopu_Raa_xray', 'One_Night_Stand_xray', 'Orange_xray', 'Orphan_xray', 'Paper_Boy_xray', 'PASSENGERS_xray', 'Pataakha_xray', 'Peranbu_Tamil_xray', 'Professor_Marston_The_Wonder_Women_xray', 'Reva_xray', 'Room_on_a_Broom_xray', 'Saw_xray', 'Searching_xray', 'Seethakaathi_xray', 'Seetha_Ramuni_Kosam_xray', 'Sex_and_the_City_The_Movie_xray', 'Sex_and_the_City_xray', 'Sharkwater_Extinction_xray', 'Sherlock_Holmes_A_Game_Of_Shadows_xray', 'Silly_Fellows_xray', 'Sliver_xray', 'Spider_Man_Into_The_Spider_Verse_xray', 'Striptease_xray', 'Suspiria_xray', 'The_Conjuring_xray', 'The_Covenant_xray', 'The_Dark_Knight_xray', 'The_Equalizer_xray', 'The_Exorcist_xray', 'The_Girl_Next_Door_xray', 'The_Godfather_xray', 'The_Gruffalo_s_Child_xray', 'The_Gruffalo_xray', 'The_Nun_xray', 'The_Only_Living_Boy_In_New_York_xray', 'The_Possession_Of_Hannah_Grace_xray', 'The_Ring_Two_xray', 'The_Upside_xray', 'Trip_To_Bhangarh_xray', 'Uncle_Drew_xray', 'Veerey_Ki_Wedding_xray', 'Venom_xray', 'Vinaya_Vidheya_Rama_xray', 'Viswasam_xray', 'Winner_xray', 'Wonderstruck_xray', 'World_War_Z_xray', 'Yuddham_Sharanam_xray'];
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.get("/", (req, res) => {
    res.render("index", {movieNames: moviesList});
});

app.get("/movie", (req, res) => {
    res.json(jsonArray);
});

app.get("/chart", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", async (req, res) => {
    let movieName = req.body.movieName;
    console.log(movieName);
    var csvpath = "xray_jsonfiles/" + movieName + '.csv';
    jsonArray = await csv().fromFile(csvpath);
    res.redirect("/chart");
    // res.redirect("/movie");
});

app.listen(3000, () => {
    console.log("Server running on Port 3000!");
});