const layouts = [
    {
        name: 'layout-1',
        elements: [
            { type: 'image-tile', src: 'https://source.unsplash.com/random/800x600/?sports-car,forest', span: '' },
            { type: 'image-tile', src: 'https://source.unsplash.com/random/800x600/?formula1,red', span: '' },
            { type: 'image-tile', src: 'https://source.unsplash.com/random/800x600/?mountain,lake', span: '' },
            { type: 'headline-tile', content: 'PUSH THE LIMITS,<br>REDEFINE THE<br>RACE.', span: '' },
            { type: 'image-tile', src: 'https://source.unsplash.com/random/800x600/?formula1,night', span: '' },
            { type: 'image-tile', src: 'https://source.unsplash.com/random/800x600/?supercar,road', span: '' },
            { type: 'image-tile', src: 'https://source.unsplash.com/random/800x600/?trophy,gold', span: '' },
            { type: 'info-tile', content: 'EXPLORE THE SCENIC ROUTES OF THE SWISS ALPS IN A HIGH-PERFORMANCE RACING CAR.', span: '' }
        ]
    },
    {
        name: 'layout-2',
        elements: [
            { type: 'image-tile', src: 'https://source.unsplash.com/random/800x600/?formula1,red', span: 'span-row-2' },
            { type: 'image-tile', src: 'https://source.unsplash.com/random/800x600/?sports-car,forest', span: '' },
            { type: 'headline-tile', content: 'PUSH THE LIMITS,<br>REDEFINE THE<br>RACE.', span: 'span-row-2' },
            { type: 'info-tile', content: 'EXPLORE THE SCENIC ROUTES OF THE SWISS ALPS IN A HIGH-PERFORMANCE RACING CAR.<br><br>EMBARK ON AN ADVENTURE ALONG THE STUNNING SHORES OF LAKE GENEVA.', span: '' },
            { type: 'image-tile', src: 'https://source.unsplash.com/random/800x600/?mountain,lake', span: 'span-col-2' },
            { type: 'image-tile', src: 'https://source.unsplash.com/random/800x600/?trophy,gold', span: '' }
        ]
    },
    {
        name: 'layout-3',
        elements: [
            { type: 'color-block color-red', content: 'RED / RED SYMBOLIZES SPEED AND PASSION, EMBODYING THE ENERGY OF A RACE REVOLUTION.', span: '' },
            { type: 'headline-tile', content: 'PUSH THE LIMITS,<br>REDEFINE THE<br>RACE.', span: 'span-row-2' },
            { type: 'color-block color-gold', content: 'GOLD / GOLD REPRESENTS TRIUMPH AND EXCELLENCE, HIGHLIGHTING THE PEAK PERFORMANCE OF A RACE REVOLUTION.', span: '' },
            { type: 'image-tile', src: 'https://source.unsplash.com/random/800x600/?sports-car,road', span: '' },
            { type: 'image-tile', src: 'https://source.unsplash.com/random/800x600/?formula1,red', span: 'span-col-2' },
            { type: 'image-tile', src: 'https://source.unsplash.com/random/800x600/?formula1,night', span: '' },
            { type: 'color-block color-blue', content: 'STEEL BLUE / STEEL BLUE CONVEYS STRENGTH AND RELIABILITY, ESSENTIAL TRAITS FOR A RACE REVOLUTION.', span: '' },
            { type: 'color-block color-green', content: 'SPRING GREEN / SPRING GREEN ADDS A FRESH AND INNOVATIVE TOUCH, REFLECTING THE FORWARD-THINKING NATURE OF A RACE REVOLUTION.', span: '' },
            { type: 'image-tile', src: 'https://source.unsplash.com/random/800x600/?racetrack', span: '' }
        ]
    },
    {
        name: 'layout-4',
        elements: [
            { type: 'color-block color-blue', content: 'STEEL BLUE / STEEL BLUE CONVEYS STRENGTH AND RELIABILITY, ESSENTIAL TRAITS FOR A RACE REVOLUTION.', span: 'span-col-2' },
            { type: 'image-tile', src: 'https://source.unsplash.com/random/800x600/?formula1,desert', span: 'span-col-2' },
            { type: 'info-tile', content: 'TAKE A THRILLING DRIVE THROUGH THE PICTURESQUE VINEYARDS OF LAVAUX.', span: 'span-col-2' },
            { type: 'image-tile', src: 'https://source.unsplash.com/random/800x600/?formula1,night', span: 'span-row-2' },
            { type: 'image-tile', src: 'https://source.unsplash.com/random/800x600/?racetrack', span: 'span-row-2' },
            { type: 'color-block color-gold', content: 'GOLD / GOLD REPRESENTS TRIUMPH AND EXCELLENCE, HIGHLIGHTING THE PEAK PERFORMANCE OF A RACE REVOLUTION.', span: 'span-col-2' },
            { type: 'headline-tile', content: 'PUSH THE LIMITS,<br>REDEFINE THE<br>RACE.', span: 'span-col-3' },
            { type: 'color-block color-green', content: 'SPRING GREEN / SPRING GREEN ADDS A FRESH AND INNOVATIVE TOUCH, REFLECTING THE FORWARD-THINKING NATURE OF A RACE REVOLUTION.', span: 'span-col-2' },
            { type: 'info-tile', content: 'EXPLORE THE SCENIC ROUTES OF THE SWISS ALPS IN A HIGH-PERFORMANCE RACING CAR.', span: 'span-col-3' },
            { type: 'image-tile', src: 'https://source.unsplash.com/random/800x600/?mountain,lake', span: 'span-col-2' },
            { type: 'info-tile', content: 'EMBARK ON AN ADVENTURE ALONG THE STUNNING SHORES OF LAKE GENEVA.', span: 'span-col-2' },
            { type: 'image-tile', src: 'https://source.unsplash.com/random/800x600/?sports-car,forest', span: 'span-col-2' },
            { type: 'image-tile', src: 'https://source.unsplash.com/random/800x600/?trophy,gold', span: 'span-row-2' },
            { type: 'color-block color-red', content: 'RED / RED SYMBOLIZES SPEED AND PASSION, EMBODYING THE ENERGY OF A RACE REVOLUTION.', span: 'span-col-2' },
            { type: 'image-tile', src: 'https://source.unsplash.com/random/800x600/?sports-car,road', span: 'span-col-3' }
        ]
    }
];