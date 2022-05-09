import enviroment from '../config'
import * as utils from './utils'
import { expectTypeOf } from "@humeris/espresso-shot";

const testMultimediaMethods = (directory: string) => {
    let multimedia = new utils.Multimedia(`${directory}`)
    describe(`Utils`, () => {
        test(`return an array of directories`, () => {
            expect(multimedia.getDirectories(multimedia.rootDirectory).length > 0).toBeTruthy()
        })

        test(`check if is a '.svg' directory`, () => {
            expect(multimedia.isSvgDirectory('directory/category/test.svg')).toBeTruthy()
        })

        test(`create category by '.svg' directory`, () => {
            const category = multimedia.createCategoryObjectBySvgDirectory('directory/category/test.svg')
            expect(expectTypeOf(category).toExtend<utils.Category>()).toBeTruthy()
            expect(category.icon).toBeTruthy()
            expect(category.name).toBeTruthy()
        })

        test(`convert directories into categories`, () => {
            const category = multimedia.convertDirectoriesToCategories(multimedia.directories)
            expect(expectTypeOf(category).toExtend<utils.Category[]>()).toBeTruthy()
            expect(category.length > 0).toBeTruthy()
        })

        test(`check if is a '.mp3' or '.jpg' directory`, () => {
            expect(multimedia.isAudioOrImage('directory/category/test.mp3')).toBeTruthy()
            expect(multimedia.isAudioOrImage('directory/category/test.jpg')).toBeTruthy()
        })

        test(`create file by '.mp3' or '.jpg' directory`, () => {
            const fileMP3 = multimedia.createFileObjectByMp3OrJpg('root/directory/category/test.mp3')
            const fileJPG = multimedia.createFileObjectByMp3OrJpg('root/directory/category/test.jpg')
            expect(expectTypeOf(fileMP3).toExtend<utils.File>()).toBeTruthy()
            expect(fileMP3.directory).toBeTruthy()
            expect(fileMP3.name).toBeTruthy()
            expect(expectTypeOf(fileJPG).toExtend<utils.File>()).toBeTruthy()
            expect(fileJPG.directory).toBeTruthy()
            expect(fileJPG.name).toBeTruthy()
        })

        test(`check if directory is not a file`, () => {
            expect(multimedia.notFile('directory/category/')).toBeTruthy()
        })

        test(`has files`, () => {
            if (multimedia.data.every(item => item.files.every(file => multimedia.isAudioOrImage(file.directory)))) {
                expect(multimedia.populateWithAudioOrImage(multimedia.rootDirectory, 'bass').length > 0).toBeTruthy()
            } else {
                expect(multimedia.populateWithVideo(multimedia.rootDirectory, multimedia.categories).length > 0).toBeTruthy()
            }
        })

        test(`has data`, () => {
            expect(multimedia.getData(multimedia.rootDirectory, multimedia.categories).length > 0).toBeTruthy()
        })
    })
}

const testMultimediaClass = (directory: string) => {
    describe(`Class`, () => {
        test('exists', () => {
            expect(new utils.Multimedia(directory).data.length > 0).toBeTruthy()
        })

        test('contain categories', () => {
            expect(new utils.Multimedia(directory).categories.length > 0).toBeTruthy()
        })

        test('contain complete data about categories', () => {
            const multimedia = new utils.Multimedia(directory)
            expect(multimedia.data.length > 0).toBeTruthy()
            expect(multimedia.data.every(item => item.files.length > 0)).toBeTruthy()
        })
    })
}

const testPublicDirectory = (directory: string, label: string) => {
    describe(`${label}`, () => {
        testMultimediaMethods(`${directory}`)
        testMultimediaClass(`${directory}`)
    })
}

testPublicDirectory(`${enviroment.STATIC_VIDEO_DIRECTORY}`, 'Video directory')
testPublicDirectory(`${enviroment.STATIC_AUDIO_DIRECTORY}`, 'Audio directory')
testPublicDirectory(`${enviroment.STATIC_IMAGE_DIRECTORY}`, 'Image directory')





