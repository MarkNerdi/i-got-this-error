export const STATUS_CODES: {
    [key: string]: {
        title: string;
        description: string;
        rfc: string;
    };
} = {
    100: {
        title: 'Continue',
        description: 'The internet\'s way of saying, "Hold your horses, we\'re just getting started!" Your request is like an overenthusiastic partygoer at the entrance, yelling, "Let me in, I\'m ready to dance!" The server, however, is the calm DJ, casually responding, "Chill, the beats are just warming up." It\'s the virtual equivalent of a friendly nod, signaling that your digital journey is on track. So, take a breath, grab your virtual popcorn, and get ready for the HTTP rollercoaster ride! ',
        rfc: 'RFC2616',
    },
    101: {
        title: 'Switching Protocols',
        description: '- because even servers like to try a new dating app! Your request is like proposing a different dance move, and the server is all ears, saying, "Sure, let\'s spice things up!" It\'s the digital equivalent of swiping right on a new connection. Your browser is getting a backstage pass to the server\'s cool protocol party, where data packets waltz in style. So, grab your virtual tango shoes and get ready to dance to a new, tech-savvy rhythm!',
        rfc: 'RFC2616',
    },
    102: {
        title: 'Processing',
        description: '- where the server is stuck in the digital kitchen, still cooking up your request! Your data is in the oven, and the server is wearing a chef\'s hat, yelling, "Hold on, it\'s not quite ready!" It\'s the online version of waiting for your pizza delivery – the anticipation is real. The server is mixing, baking, and processing your request to perfection. So, sit back, relax, and enjoy the virtual aroma of your data dish. It\'ll be served piping hot soon! 🍕👩‍🍳 #DigitalCookingDelays',
        rfc: 'RFC2518',
    },
    200: {
        title: 'OK',
        description: 'When the internet gives you a virtual high-five for a job well done! Your request is like a smooth talker at a tech conference, and the server is nodding in approval, saying, "Alright, you\'ve got the magic touch!" It\'s the digital version of a victory dance – your data packets are doing the electric slide of success. So, pat yourself on the back, your webpage is the star of the internet show, and the server is the enthusiastic audience clapping in binary code. 👏',
        rfc: 'RFC2616',
    },
    201: {
        title: 'Created',
        description: '',
        rfc: 'RFC2616',
    },
    202: {
        title: 'Accepted',
        description: '',
        rfc: 'RFC2616',
    },
    203: {
        title: 'Non-Authoritative Information',
        description: '',
        rfc: 'RFC2616',
    },
    204: {
        title: 'No Content',
        description: '',
        rfc: 'RFC2616',
    },
    205: {
        title: 'Reset Content',
        description: '',
        rfc: 'RFC2616',
    },
    206: {
        title: 'Partial Content',
        description: '',
        rfc: 'RFC2616',
    },
    207: {
        title: 'Multi-Status',
        description: '',
        rfc: 'RFC4918',
    },
    208: {
        title: 'Already Reported',
        description: '',
        rfc: 'RFC5842',
    },
    226: {
        title: 'IM Used',
        description: '',
        rfc: 'RFC3229',
    },
    300: {
        title: 'Multiple Choices',
        description: '',
        rfc: 'RFC2616',
    },
    301: {
        title: 'Moved Permanently',
        description: '',
        rfc: 'RFC2616',
    },
    302: {
        title: 'Found',
        description: '',
        rfc: 'RFC2616',
    },
    303: {
        title: 'See Other',
        description: '',
        rfc: 'RFC2616',
    },
    304: {
        title: 'Not Modified',
        description: '',
        rfc: 'RFC2616',
    },
    305: {
        title: 'Use Proxy',
        description: '',
        rfc: 'RFC2616',
    },
    306: {
        title: 'Reserved',
        description: '',
        rfc: 'RFC2616',
    },
    307: {
        title: 'Temporary Redirect',
        description: '',
        rfc: 'RFC2616',
    },
    308: {
        title: 'Permanent Redirect',
        description: '',
        rfc: 'RFC2616',
    },
    400: {
        title: 'Bad Request',
        description: '',
        rfc: 'RFC2616',
    },
    401: {
        title: 'Unauthorized',
        description: '– because even the internet has trust issues! Your request is wearing a disguise, but the server is playing detective, saying, "Hold up, who goes there?" It\'s like trying to sneak into a secret club without the secret handshake. Your credentials are doing the cha-cha, but the server is just not convinced. Time to whip out your virtual ID or at least try a more convincing password – the cyber bouncer isn\'t easily fooled!',
        rfc: 'RFC2616',
    },
    402: {
        title: 'Payment Required',
        description: 'Because even servers need a little digital dough to keep the lights on! Your request is stuck in the cyber checkout line, and the server\'s looking at you like, "No pay, no play." It\'s the internet\'s way of saying, "Show me the money, and I might just show you the webpage." Time to dig into your digital wallet or start a crowdfunding campaign for your webpage dreams',
        rfc: 'RFC2616',
    },
    403: {
        title: 'Forbidden',
        description: 'It\'s like trying to crash a VIP party without an invite. The internet bouncer is giving you the virtual side-eye, saying, "Sorry, pal, you\'re not on the list." Your request is dressed in a digital tuxedo, but the server is just not feeling it. Time to brush up on your cyber-charm or find a backdoor – just don\'t blame us if you end up in the digital doghouse!',
        rfc: 'RFC2616',
    },
    404: {
        title: 'Not Found',
        description: '',
        rfc: 'RFC2616',
    },
    405: {
        title: 'Method Not Allowed',
        description: '',
        rfc: 'RFC2616',
    },
    406: {
        title: 'Not Acceptable',
        description: '',
        rfc: 'RFC2616',
    },
    407: {
        title: 'Proxy Authentication Required',
        description: '',
        rfc: 'RFC2616',
    },
    408: {
        title: 'Request Timeout',
        description: '',
        rfc: 'RFC2616',
    },
    409: {
        title: 'Conflict',
        description: '',
        rfc: 'RFC2616',
    },
    410: {
        title: 'Gone',
        description: 'When the webpage vanishes like a magician\'s rabbit, leaving your browser utterly perplexed. Abracadabra, and poof! Your request is met with a virtual top hat tip from the server, saying, "I\'ve decided to take my talents elsewhere." It\'s like trying to catch a disappearing act but without the encore. Time to applaud the elusive webpage or practice your sleight of hand for a quick reappearing trick! ',
        rfc: 'RFC2616',
    },
    411: {
        title: 'Length Required',
        description: 'When your request forgets to bring a tape measure to the internet tailor. The server is giving you a stern look, saying, "No size, no service!" It\'s the digital version of trying to order a custom-fit webpage without providing the right dimensions. Time to break out the virtual measuring tape or risk getting a one-size-fits-none error. 📏❌ #SizeMatters',
        rfc: 'RFC2616',
    },
    412: {
        title: 'Precondition Failed',
        description: 'When your internet plans go haywire because the server has a list of prerequisites longer than a college syllabus. Your request is like turning up to a potluck dinner without bringing a dish – the server is not having it. It\'s the digital eye-roll saying, "Did you even read the requirements?" Better check the fine print or prepare for a virtual rejection.',
        rfc: 'RFC2616',
    },
    413: {
        title: 'Request Entity Too Large',
        description: 'Because even data has its limits, and your request just brought the digital equivalent of an elephant to the server\'s tea party. It\'s like trying to fit a giraffe through a mouse hole – not happening. The server is giving you a virtual side-eye, saying, "Sorry, but our capacity is not jumbo-sized." Time to put your data on a digital diet or face the consequences of payload obesity.',
        rfc: 'RFC2616',
    },
    414: {
        title: 'Request-URI Too Long',
        description: 'When your URL is longer than a CVS receipt! Your web browser is gasping for breath, yelling, "Hold on, I need a magnifying glass for this one!" It\'s the digital version of trying to stretch a rubber band to the moon – just not happening. Maybe it\'s time to consider shorter links or a career in URL gymnastics. Long story short (pun intended), keep it concise, or prepare for your browser to break out in URL hives! 🧐📏 #URIStretchGoals',
        rfc: 'RFC2616',
    },
    415: {
        title: 'Unsupported Media Type',
        description: 'When your request shows up in a mime costume to a digital costume party. The server is scratching its virtual head, saying, "Nice try, but we only speak in pixels here." It\'s the digital version of trying to play a Blu-ray in a VHS player. Time to upgrade your tech wardrobe or risk being the unsupported media misfit.',
        rfc: 'RFC2616',
    },
    416: {
        title: 'Requested Range Not Satisfiable',
        description: 'When your request tries to Netflix and chill with the server but can\'t agree on the ideal episode. The server is giving you the digital side-eye, saying, "Sorry, but our binge-watching preferences don\'t match." It\'s like trying to find common ground between rom-coms and sci-fi – good luck satisfying that range!',
        rfc: 'RFC2616',
    },
    417: {
        title: 'Expectation Failed',
        description: 'When your request brings a bouquet of roses to the server\'s digital doorstep, but it turns out the server is just not that into flowers. It\'s the digital version of a romantic comedy plot twist. The server is shrugging, saying, "Nice gesture, but I expected chocolates." Time to learn the server\'s love language or face the disappointment of unmet expectations.',
        rfc: 'RFC2616',
    },
    418: {
        title: 'I\'m a teapot',
        description: 'Because even servers need a coffee break! Your request is met with a quirky rebellion from the server, declaring, "I\'m sorry, but I\'ve decided to embrace my teapot identity today." It\'s like trying to get your morning caffeine fix from a rebellious appliance. The server is sipping on virtual chamomile, and your data is left wondering if it accidentally stumbled into a whimsical wonderland. Time to appreciate the server\'s unexpected sense of humor or find a more coffee-friendly connection',
        rfc: 'RFC2616',
    },
    422: {
        title: 'Unprocessable Entity',
        description: 'When your request throws a digital tantrum because the server didn\'t understand its emoji language. It\'s like trying to communicate in hieroglyphics with a modern-day scholar – confusion ensues. The server is raising a virtual eyebrow, saying, "Sorry, but your entity is just unprocessable." Time to translate your digital emotions or risk being lost in translation.',
        rfc: 'RFC4918',
    },
    423: {
        title: 'Locked',
        description: 'Because even servers need a break sometimes, and your request caught them taking a digital siesta. The server is sipping virtual lemonade in a hammock, saying, "Give me a moment; I\'m on server vacation time." It\'s like trying to get a reply from your friend who\'s on a silent meditation retreat. Time to be patient or find another server who\'s not on a digital beach holiday. 🏖️⏳ #ServerSiesta',
        rfc: 'RFC4918',
    },
    424: {
        title: 'Failed Dependency',
        description: 'When your request brings along its entire drama squad, but the server isn\'t interested in hosting a digital soap opera. It\'s like trying to introduce a needy friend to a no-nonsense party. The server is giving you the side-eye, saying, "Sorry, but we\'re not equipped to handle your dependencies." Time to untangle your digital relationships or risk server therapy bills. 🤷‍♂️💔 #DependencyDrama',
        rfc: 'RFC4918',
    },
    426: {
        title: 'Upgrade Required',
        description: 'When your request tries to take the server on a digital date but gets hit with a "We need to see other protocols" talk. It\'s like being in a tech romance where the server wants an upgrade, and your request is stuck on dial-up mode. Time to level up your tech game or risk getting ghosted by the server. 👻💔 #UpgradeHeartbreak',
        rfc: 'RFC2817',
    },
    428: {
        title: 'Precondition Required',
        description: 'when your request is caught in a digital game of "Simon says" with the server. The server is playing the role of Simon, saying, "Hold on, you forgot to say \'Simon says\' before making that request!" It\'s the virtual version of trying to follow the rules of an unseen referee. Better brush up on your preconditions or risk getting a red card from the server\'s digital rulebook. 🚦👮‍♂️ #SimonSays428',
        rfc: 'RFC6585',
    },
    429: {
        title: 'Too Many Requests',
        description: 'When your request parties so hard on the internet that the server becomes the digital bouncer, saying, "Slow down there, cowboy, you can\'t hog the whole dance floor!" It\'s like trying to order one too many appetizers at a tapas bar – the server is kindly asking for a chill pill. Time to pace yourself in the cyberspace nightclub or risk being escorted out by the virtual security.',
        rfc: 'RFC6585',
    },
    431: {
        title: 'Request Header Fields Too Large',
        description: 'When your request shows up at the internet\'s buffet with a plate so overflowing that the server can\'t handle the feast. It\'s like trying to bring an elephant through the door of a vegan restaurant – excessive and unnecessary. The server is shaking its virtual head, saying, "Sorry, but your headers are just too big for this party." Time to trim down your digital appetite or risk being banned from the buffet line. 🍽️🐘 ',
        rfc: 'RFC6585',
    },
    500: {
        title: 'Internal Server Error',
        description: 'When your request accidentally stumbled upon the server\'s digital therapy session. It\'s like catching the server in its metaphorical pajamas, saying, "Oops, sorry, we\'re working on our issues." The server is juggling virtual emotions, and your request just became an unintended therapist. Time to give the server some space or risk becoming part of its emotional baggage.',
        rfc: 'RFC2616',
    },
    501: {
        title: 'Not Implemented',
        description: 'When your request suggests a tech feature that the server hasn\'t even heard of, like trying to explain TikTok to your grandparents. The server is scratching its virtual head, saying, "Nice try, but we\'re not that advanced yet." Time to lower your tech expectations or risk being the visionary ahead of your digital time. ',
        rfc: 'RFC2616',
    },
    502: {
        title: 'Bad Gateway',
        description: 'When your request finds a gateway to the internet that\'s more like a broken drawbridge than a grand entrance. It\'s like trying to cross a bridge made of spaghetti – not a smooth journey. The server is apologizing, saying, "Our gateway needs a fixer-upper." Time to reroute your digital commute or risk getting stuck in the spaghetti traffic. ',
        rfc: 'RFC2616',
    },
    503: {
        title: 'Service Unavailable',
        description: 'When your request shows up at the internet restaurant, but the server is taking a coffee break, saying, "Sorry, the internet kitchen is closed for maintenance." It\'s like trying to order a virtual pizza during the chef\'s nap time. Time to find another digital diner or risk going hungry in the internet food court. ',
        rfc: 'RFC2616',
    },
    504: {
        title: 'Gateway Timeout',
        description: 'When your request waits at the internet\'s front door, but the server is stuck in a time warp, saying, "Sorry, our gateway is on island time." It\'s like trying to catch a train that left five minutes ago. Time to set your digital watch or risk being fashionably late to the internet party',
        rfc: 'RFC2616',
    },
    505: {
        title: 'HTTP Version Not Supported',
        description: '',
        rfc: 'RFC2616',
    },
    506: {
        title: 'Variant Also Negotiates',
        description: '',
        rfc: 'RFC2295',
    },
    507: {
        title: 'Insufficient Storage',
        description: '',
        rfc: 'RFC4918',
    },
    508: {
        title: 'Loop Detected',
        description: '',
        rfc: 'RFC5842',
    },
    510: {
        title: 'Not Extended',
        description: '',
        rfc: 'RFC2774',
    },
    511: {
        title: 'Network Authentication Required',
        description: '',
        rfc: 'RFC6585',
    },
};
