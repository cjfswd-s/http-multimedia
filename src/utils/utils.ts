import glob from "glob"

// import fs from 'fs'

// Common types
export interface Category { icon: string, name: string }
export interface File { name: string, directory: string }
export interface Data {
    category: Category,
    files: File[]
}

export class Multimedia {
    public rootDirectory: string
    public directories: string[];
    public categories: Category[];
    public data: Data[];

    constructor(directory: string) {
        this.rootDirectory = directory
        this.directories = this.getDirectories(this.rootDirectory)
        this.categories = this.convertDirectoriesToCategories(this.directories)
        this.data = this.getData(this.rootDirectory, this.categories)
    }

    public getDirectories = (directory: string): string[] => glob.sync(`${directory}/**/*`)

    public isSvgDirectory = (directory: string): boolean => directory.includes('.svg')

    public createCategoryObjectBySvgDirectory = (directory: string): Category => Object.assign({
        name: directory.split('/')[2],
        icon: directory
    })

    public convertDirectoriesToCategories = (directories: string[]): Category[] => {
        return directories
            .filter(directory => this.isSvgDirectory(directory))
            .map(directory => this.createCategoryObjectBySvgDirectory(directory))
    }

    public isAudioOrImage = (directory: string): boolean => {
        return directory.includes('.mp3') || directory.includes('.jpg')
    }

    public createFileObjectByMp3OrJpg = (directory: string): File => Object.assign({
        name: directory.split('/')[3].replace(/_/g, ' ').replace('.mp3', '').replace('.jpg', ''),
        directory
    })

    public notFile = (directory: string): boolean => {
        return !directory.includes('.svg') && !directory.includes('.jpg') &&
            !directory.includes('.mp4') && !directory.includes('.mp3')
    }

    public getVideoDirectories = (rootDirectory: string, categoryDirectoryName: string): File[] => {
        return glob.sync(`${rootDirectory}/${categoryDirectoryName}/**/*`)
            .filter(directory => this.notFile(directory))
            .map(filteredDirectory => Object.assign({
                name: filteredDirectory.split('/')[3].replace(/_/g, ' '),
                directory: filteredDirectory
            }))
    }

    public populateWithVideo = (rootDirectory: string, categoryList: Category[]): Data[] => {
        return categoryList.map(category => {
            return Object.assign({
                category,
                files: this.getVideoDirectories(rootDirectory, category.name)
            })
        })
    }

    public populateWithAudioOrImage = (rootDirectory: string, categoryDirectoryName: string): File[] => {
        return glob.sync(`${rootDirectory}/${categoryDirectoryName}/**/*`)
            .filter(directory => this.isAudioOrImage(directory))
            .map(directory => this.createFileObjectByMp3OrJpg(directory))
    }

    public getData = (rootDirectory: string, allCategoryData: Category[]): Data[] => {
        let result: Data[] = this.populateWithVideo(rootDirectory, allCategoryData)
        if (result.every(item => item.files.length == 0))
            result.forEach(item => item.files = this.populateWithAudioOrImage(rootDirectory, item.category.name))
        return result
    }
}

