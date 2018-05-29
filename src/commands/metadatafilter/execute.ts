import {Command, flags} from '@oclif/command'

export default class ExecuteFilter extends Command {
  static description = 'Allows to filter metadatas folder generated by sfdx force:source:convert , using your own package.xml'

  static examples = [
    `$ sfdx metadatafilter:execute -p myPackage.xml
`,
    `$ sfdx metadatafilter:execute -i md_api_output_dir -p myPackage.xml -o md_api_filtered_output_dir
`,
  ]

  static flags = {
    // flag with a value (-n, --name=VALUE)
    packagexml: flags.string({char: 'p', description: 'package.xml file path'}),
    inputfolder: flags.string({char: 'i', description: 'Input folder (default: "." )'}),
    outputfolder: flags.string({char: 'o', description: 'Output folder (default: filteredMetadatas)'})
  }

  static args = []

  // Input params properties
  packageXmlFile
  inputFolder
  outputFolder

  // Internal properties
  packageXmlMetadatasTypeLs = []
  

  async run() {
    const {args, flags} = this.parse(ExecuteFilter)

    // Get input arguments or default values
    this.packageXmlFile = flags.packagexml 
    this.inputFolder = flags.inputfolder || '.'
    this.outputFolder = flags.outputfolder || 'filteredMetadatas'
    this.log(`Initialize filtering of ${this.inputFolder} ,using ${this.packageXmlFile} , into ${this.outputFolder}`)

    // Read package.xml file
    var fs = require('fs'),
    fse = require('fs-extra'),
    xml2js = require('xml2js'),
    util = require('util');
    var parser = new xml2js.Parser();
    var self = this
    fs.readFile(this.packageXmlFile, function (err, data) {
      parser.parseString(data, function (err2, result) {
        console.log(util.inspect(result, false, null))

        // get metadata types in parse result
        try {self.packageXmlMetadatasTypeLs = result.Package.types }
        catch { throw 'Unable to parse packageXml file '+self.packageXmlFile}

        // Create output folder/empty it if existing
        if (fs.existsSync(self.outputFolder)) {
          console.log('Empty target directory')
          fse.emptyDirSync(self.outputFolder);
        }
        else {
          fs.mkdirSync(self.outputFolder)
        }

        // Process source folder filtering and copy files into target folder
        self.filterMetadatasByType()

      });
    });

  }

  // Filter metadatas by type
  filterMetadatasByType() {
    var fs = require('fs')
    const fse = require('fs-extra')
    var path = require('path')
    var self = this
    this.packageXmlMetadatasTypeLs.forEach(function(metadataDefinition){
      var metadataType = metadataDefinition.name
      var members = metadataDefinition.members

      // Get metadata description
      var metadataDesc = self.getMetadataTypeDescription(metadataType)
      if (metadataDesc == null) {
         console.log(`- Skipped processing of ${metadataType} : Metadatype Description not found / implemented yet`)
         return
      }

      // Browse folder for matching files and copy them into target folder
      var typeInputFolder = self.inputFolder+'/'+metadataDesc.folder
      console.log(`- Initialize processing of ${metadataType} , checking folder ${typeInputFolder}`)

      if (fs.existsSync(typeInputFolder)) {
        var typeOutputFolder = self.outputFolder+'/'+metadataDesc.folder
        // Create member folder in output folder
        fs.mkdirSync(typeOutputFolder)

        // Iterate all metadata types members
        members.forEach(function (member) {
          // Iterate all possible extensions
          metadataDesc.nameSuffixList.forEach(function (nameSuffix) {
            // If input file exists, copy it in output folder
            var sourceFile = typeInputFolder + '/' + member + nameSuffix
            if (fs.existsSync(sourceFile)) {
              var copyTargetFile = typeOutputFolder + '/' + member + nameSuffix
              fse.copySync(sourceFile, copyTargetFile)
            }

          })
        })
      }

    });
  }

  // get Metadatype description
  getMetadataTypeDescription (md_type) {
    var desc = this.describeMetadataTypes()[md_type]
    return desc
  }

  // Describe packageXml <=> metadata folder correspondance
  describeMetadataTypes () {
    const metadataTypesDescription = {
      'ApexClass' : { folder: 'classes' , nameSuffixList: ['.cls','.cls-meta.xml']},
      'ApexComponent' : { folder: 'components' , nameSuffixList: ['.component','.component-meta.xml']},
      'ApexPage' : { folder: 'pages' , nameSuffixList: ['.page','.page-meta.xml']},
      'ApexTrigger' : { folder: 'triggers' , nameSuffixList: ['.trigger','.trigger-meta.xml']}, 
      'AuraDefinitionBundle' : { folder: 'aura' , nameSuffixList: ['']},
      // NV: To complete
      
    }
    return metadataTypesDescription
  }
}