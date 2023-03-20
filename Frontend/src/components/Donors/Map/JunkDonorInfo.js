const donors = [
	{
		id: "47d0362a-29e2-4c7e-925a-cf361d8f8559",
		name: "Rajesh Kumar",
		bloodGroup: "AB+",
		location: {
			latitude: 13.065778,
			longitude: 80.224952,
		},
	},
	{
		id: "3b0d3da9-0e2f-40d2-a2e2-eb72c19ba0f7",
		name: "Vijayalakshmi S",
		bloodGroup: "O-",
		location: {
			latitude: 12.900001,
			longitude: 80.306058,
		},
	},
	{
		id: "87dd9785-fc97-4d8a-b9f9-5e22d4adad8a",
		name: "Krishnan M",
		bloodGroup: "AB-",
		location: {
			latitude: 12.791607,
			longitude: 80.25944,
		},
	},
	{
		id: "802ec91d-9910-4651-88c3-f7b90f3d11d3",
		name: "Vishal S",
		bloodGroup: "A+",
		location: {
			latitude: 12.967324,
			longitude: 80.218558,
		},
	},
	{
		id: "b0c78b35-26fa-4619-b9a7-72828e790dca",
		name: "Abdul Rahman",
		bloodGroup: "B-",
		location: {
			latitude: 12.91709,
			longitude: 80.200252,
		},
	},
	{
		id: "4e12da57-89e7-4c75-9620-757a8c71f9e1",
		name: "Kavitha B",
		bloodGroup: "A+",
		location: {
			latitude: 13.077458,
			longitude: 80.223649,
		},
	},
	{
		id: "ed0a2f2c-29d6-45f2-a1f6-8d79b83d6d3c",
		name: "Nikhil P",
		bloodGroup: "B-",
		location: {
			latitude: 13.133072,
			longitude: 80.288107,
		},
	},
	{
		id: "802e21f6-95d6-4e39-a8f6-1d87f0cc126f",
		name: "Sangeetha N",
		bloodGroup: "A-",
		location: {
			latitude: 13.112616,
			longitude: 80.240861,
		},
	},
	{
		id: "37d45c2e-52a7-408c-bf5e-3d562332ac9d",
		name: "Aravind R",
		bloodGroup: "O+",
		location: {
			latitude: 13.166511,
			longitude: 80.223924,
		},
	},
	{
		id: "d8d291e4-ccf9-4f08-aec7-07c618f4ab7f",
		name: "Nikhil Kumar",
		bloodGroup: "O+",
		location: {
			latitude: 13.0827,
			longitude: 80.2707,
		},
	},

	{
		id: "e025ff1d-411d-4ca7-9678-6cfd4736d98d",
		name: "Priya Raman",
		bloodGroup: "A+",
		location: {
			latitude: 13.0476,
			longitude: 80.2508,
		},
	},

	{
		id: "0d6963d1-9e9e-48b8-8fa1-2db85c57969f",
		name: "Rajesh Sharma",
		bloodGroup: "B+",
		location: {
			latitude: 13.0524,
			longitude: 80.2508,
		},
	},

	{
		id: "0c7684c4-4b12-4df2-a42e-9c74d60b2825",
		name: "Aruna Sundar",
		bloodGroup: "O-",
		location: {
			latitude: 13.0478,
			longitude: 80.2084,
		},
	},

	{
		id: "cf7d1f14-8a63-460f-a6c9-d6cb08d6c8b3",
		name: "Vikram Singh",
		bloodGroup: "A-",
		location: {
			latitude: 13.0825,
			longitude: 80.2705,
		},
	},

	{
		id: "5bf5f5c5-30b1-4810-a41f-5ee65da8f21f",
		name: "Kavya Patel",
		bloodGroup: "AB+",
		location: {
			latitude: 13.0694,
			longitude: 80.2444,
		},
	},
	{
		id: "1edc7328-737d-43b9-a0c5-03e148fb2d2b",
		name: "Anil Gupta",
		bloodGroup: "B-",
		location: {
			latitude: 13.0514,
			longitude: 80.2124,
		},
	},
	{
		id: "98f00e33-3a1d-46dd-b2b8-20c5d5a53e5c",
		name: "Divya Menon",
		bloodGroup: "A+",
		location: {
			latitude: 13.0175,
			longitude: 80.2005,
		},
	},
	{
		id: "d09de6e9-6faa-4328-87e3-3d1e3ff22cb2",
		name: "Sanjay Kumar",
		bloodGroup: "AB-",
		location: {
			latitude: 13.0558,
			longitude: 80.2079,
		},
	},
	{
		id: "7cca1809-d806-4d50-bc2f-0a51d1edf151",
		name: "Shaan Bhavsar",
		bloodGroup: "O+",
		location: {
			latitude: 12.895186,
			longitude: 80.241685,
		},
	},
	{
		id: "60abbec4-fec6-40f2-a5ee-d8a6b71fd3b3",
		name: "Rhea Gill",
		bloodGroup: "O+",
		location: {
			latitude: 13.147027,
			longitude: 80.327239,
		},
	},
	{
		id: "3e9b2a07-1618-4f03-a05c-f6169d6acc7e",
		name: "Raghav Kaul",
		bloodGroup: "AB-",
		location: {
			latitude: 12.977518,
			longitude: 80.313947,
		},
	},
	{
		id: "70419beb-0134-4ce4-95c5-64dde79107c6",
		name: "Sumer Thaman",
		bloodGroup: "AB-",
		location: {
			latitude: 12.987607,
			longitude: 80.293174,
		},
	},
	{
		id: "3650dd59-fb71-43bd-9078-4733ff55b64c",
		name: "Aaina Dugar",
		bloodGroup: "O+",
		location: {
			latitude: 12.833299,
			longitude: 80.279396,
		},
	},
	{
		id: "50b34121-f737-4d99-a4ef-c62f26c99874",
		name: "Ela Hans",
		bloodGroup: "AB+",
		location: {
			latitude: 13.196803,
			longitude: 80.299564,
		},
	},
	{
		id: "065be587-ae70-41b7-b0be-680173a03d13",
		name: "Arnav Khosla",
		bloodGroup: "O-",
		location: {
			latitude: 13.022693,
			longitude: 80.267568,
		},
	},
	{
		id: "787b8145-c5ef-4d5e-8652-c3d652915673",
		name: "Yasmin Desai",
		bloodGroup: "B-",
		location: {
			latitude: 13.104068,
			longitude: 80.150585,
		},
	},
	{
		id: "334bb3a3-4871-492d-82f5-9417318aff98",
		name: "Nishith Dayal",
		bloodGroup: "AB-",
		location: {
			latitude: 12.966626,
			longitude: 80.216059,
		},
	},
	{
		id: "2b8bbc66-b1b2-45fc-be34-ee401706cd96",
		name: "Kabir Devan",
		bloodGroup: "O-",
		location: {
			latitude: 13.061296,
			longitude: 80.186522,
		},
	},
	{
		id: "8ef9e5c5-c354-4f84-8703-624377cfcbe3",
		name: "Aaryahi Sandhu",
		bloodGroup: "O-",
		location: {
			latitude: 13.008729,
			longitude: 80.143759,
		},
	},
	{
		id: "3c254b90-02b3-4e65-a4e7-bdd2579457d3",
		name: "Drishya Varughese",
		bloodGroup: "A-",
		location: {
			latitude: 13.181989,
			longitude: 80.173432,
		},
	},
	{
		id: "fea4603b-67a7-4c74-98b2-cab8c5e16a89",
		name: "Adah Atwal",
		bloodGroup: "A-",
		location: {
			latitude: 12.793605,
			longitude: 80.231026,
		},
	},
	{
		id: "74e7a644-c557-4219-a6c6-bc703d6a8247",
		name: "Lakshay Comar",
		bloodGroup: "AB+",
		location: {
			latitude: 13.085033,
			longitude: 80.195381,
		},
	},
	{
		id: "1979dc63-735b-450f-a9a5-42530769d0b9",
		name: "Amani Rout",
		bloodGroup: "AB+",
		location: {
			latitude: 13.166951,
			longitude: 80.262941,
		},
	},
	{
		id: "4d320214-646d-4fc7-b23a-78d1cc9705fe",
		name: "Madhup Chand",
		bloodGroup: "B+",
		location: {
			latitude: 13.038363,
			longitude: 80.237589,
		},
	},
	{
		id: "2bf020e1-ec3e-4cef-94ef-db8bb566206d",
		name: "Riaan Badal",
		bloodGroup: "B+",
		location: {
			latitude: 13.097204,
			longitude: 80.145531,
		},
	},
	{
		id: "bd363411-4bda-44ac-904b-44235715b958",
		name: "Advik Master",
		bloodGroup: "O-",
		location: {
			latitude: 13.131157,
			longitude: 80.230918,
		},
	},
	{
		id: "8806b831-ca5f-4dc1-b61a-59517b318c2a",
		name: "Eva Dasgupta",
		bloodGroup: "O-",
		location: {
			latitude: 13.104854,
			longitude: 80.151189,
		},
	},
	{
		id: "4809906d-d5de-41e4-b1a7-1937fcf21de3",
		name: "Kanav Dutta",
		bloodGroup: "B+",
		location: {
			latitude: 12.941447,
			longitude: 80.175565,
		},
	},
	{
		id: "d7041d21-832a-4973-90a1-2a2ced906a9b",
		name: "Jhanvi Baral",
		bloodGroup: "B-",
		location: {
			latitude: 12.830693,
			longitude: 80.168091,
		},
	},
	{
		id: "83b94425-9598-4551-bb31-026ec668f1a6",
		name: "Parinaaz Mannan",
		bloodGroup: "AB-",
		location: {
			latitude: 12.78135,
			longitude: 80.175872,
		},
	},
	{
		id: "c92fbc36-36cc-4892-ace7-06144810e3b3",
		name: "Nitya Dara",
		bloodGroup: "B-",
		location: {
			latitude: 12.943912,
			longitude: 80.264644,
		},
	},
	{
		id: "6416aff54f7fef4ccd3373b7",
		name: "Arul",
		bloodGroup: "AB+",
		location: {
			latitude: 13.037005,
			longitude: 80.1357345,
		},
	},
	{
		id: "640b581e96d2489975acd4f2",
		name: "bala",
		bloodGroup: "A-",
		location: {
			latitude: 12.8996,
			longitude: 80.2209,
		},
	},
	{
		id: "14e9e0d0-1a80-43f8-8bfa-2decac953b9a",
		name: "Jayan Chhabra",
		bloodGroup: "B+",
		location: {
			latitude: 13.022624,
			longitude: 80.295249,
		},
	},
	{
		id: "f51ddcce-0fe4-408e-a035-00738833aff3",
		name: "Nehmat Chowdhury",
		bloodGroup: "O+",
		location: {
			latitude: 12.91692,
			longitude: 80.269633,
		},
	},
	{
		id: "404f76fc-0d3f-4537-936c-5a68d83396cd",
		name: "Hiran Biswas",
		bloodGroup: "B-",
		location: {
			latitude: 13.124773,
			longitude: 80.14644,
		},
	},
	{
		id: "5998d47b-b89e-4136-aa99-fe374bb16d9b",
		name: "Misha Gala",
		bloodGroup: "O-",
		location: {
			latitude: 13.188573,
			longitude: 80.238508,
		},
	},
	{
		id: "147e12d5-7521-4c7a-afc0-131b5fc43a07",
		name: "Siya Salvi",
		bloodGroup: "AB+",
		location: {
			latitude: 12.982236,
			longitude: 80.145329,
		},
	},
	{
		id: "1c01ea7f-550e-477a-8a1b-30880a92bcdb",
		name: "Reyansh Balakrishnan",
		bloodGroup: "AB+",
		location: {
			latitude: 13.200569,
			longitude: 80.173929,
		},
	},
	{
		id: "824ab0a3-7cf9-4e44-ada2-590ff843b417",
		name: "Aarav Kade",
		bloodGroup: "A-",
		location: {
			latitude: 13.038542,
			longitude: 80.263935,
		},
	},
	{
		id: "1aee310c-3286-471c-9313-29670b8e84b4",
		name: "Vanya Devi",
		bloodGroup: "B+",
		location: {
			latitude: 12.795734,
			longitude: 80.191982,
		},
	},
	{
		id: "d65bd12c-d69c-4dab-b647-25924b1f129c",
		name: "Khushi Shenoy",
		bloodGroup: "O-",
		location: {
			latitude: 12.775085,
			longitude: 80.255972,
		},
	},
	{
		id: "09f39527-8913-4853-b136-7c67f6d42463",
		name: "Nehmat Sethi",
		bloodGroup: "O+",
		location: {
			latitude: 12.837696,
			longitude: 80.214505,
		},
	},
	{
		id: "970a126c-88f5-45cd-9933-971b7743b220",
		name: "Anay Varkey",
		bloodGroup: "AB+",
		location: {
			latitude: 12.883814,
			longitude: 80.258313,
		},
	},
	{
		id: "665f9f00-c4cb-4b8c-b269-93912dd9c331",
		name: "Shanaya Sathe",
		bloodGroup: "A+",
		location: {
			latitude: 13.049811,
			longitude: 80.242904,
		},
	},
	{
		id: "7b74905a-8dbd-4c12-9c4f-e7473de54066",
		name: "Kashvi Jain",
		bloodGroup: "O-",
		location: {
			latitude: 13.049983,
			longitude: 80.257643,
		},
	},
	{
		id: "9174d22c-5011-4c0a-8c5b-074b77ba7e3e",
		name: "Samarth Aurora",
		bloodGroup: "B+",
		location: {
			latitude: 12.975632,
			longitude: 80.165595,
		},
	},
	{
		id: "06255e67-8e3e-4b11-98f1-7e3406269740",
		name: "Kiaan Sabharwal",
		bloodGroup: "O-",
		location: {
			latitude: 12.805947,
			longitude: 80.227278,
		},
	},
	{
		id: "2acc0b58-181b-4162-8f73-71526faf7dc3",
		name: "Sumer Sampath",
		bloodGroup: "O+",
		location: {
			latitude: 13.190172,
			longitude: 80.268796,
		},
	},
	{
		id: "b493dd8b-8d3e-4c77-83fb-b98d6e3f9fc6",
		name: "Heer Doctor",
		bloodGroup: "AB+",
		location: {
			latitude: 12.95267,
			longitude: 80.207348,
		},
	},
	{
		id: "0ca11b31-cb68-4a24-820e-ae099df6656e",
		name: "Arhaan Savant",
		bloodGroup: "A+",
		location: {
			latitude: 13.014544,
			longitude: 80.170285,
		},
	},
	{
		id: "05656406-dad1-44a4-a6d1-5b76a4b19588",
		name: "Riya Chaudry",
		bloodGroup: "O-",
		location: {
			latitude: 12.7768,
			longitude: 80.208977,
		},
	},
	{
		id: "9b5a58c9-1078-4353-bc9e-796353faee48",
		name: "Kiaan Rama",
		bloodGroup: "AB-",
		location: {
			latitude: 13.051034,
			longitude: 80.152958,
		},
	},
	{
		id: "72450c93-3ff2-4116-ae14-239f9b723758",
		name: "Ehsaan Bhatnagar",
		bloodGroup: "AB+",
		location: {
			latitude: 13.059265,
			longitude: 80.213119,
		},
	},
	{
		id: "851fd0ab-0ac2-4e0a-8ef7-60576d18ef58",
		name: "Nirvi Sura",
		bloodGroup: "A-",
		location: {
			latitude: 12.912495,
			longitude: 80.240879,
		},
	},
	{
		id: "02a6b3c6-615b-46d2-8b47-7aa0e516a740",
		name: "Aradhya Sharma",
		bloodGroup: "O+",
		location: {
			latitude: 13.109566,
			longitude: 80.235718,
		},
	},
	{
		id: "e5822485-3c8b-4663-8b8e-adf70927cb8e",
		name: "Amira Bora",
		bloodGroup: "B-",
		location: {
			latitude: 13.060709,
			longitude: 80.154379,
		},
	},
	{
		id: "820b8dfa-412c-4289-94b6-fbe95d6118af",
		name: "Advik Kashyap",
		bloodGroup: "A+",
		location: {
			latitude: 12.825095,
			longitude: 80.315391,
		},
	},
	{
		id: "fba22725-b0a0-4b02-ba7c-99312ae08c2b",
		name: "Lagan Dalal",
		bloodGroup: "O-",
		location: {
			latitude: 12.79454,
			longitude: 80.259886,
		},
	},
	{
		id: "795ad91f-2526-45c2-b04e-9163ab88e3d3",
		name: "Advika Chana",
		bloodGroup: "AB-",
		location: {
			latitude: 12.922111,
			longitude: 80.233079,
		},
	},
];

export default donors;
