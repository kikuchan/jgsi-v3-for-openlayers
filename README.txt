【はじめに】

THIS IS HIGHLY BETA PROGRAM, SO FAR.
DO NOT USE THIS PROGRAM ON/IN/AS A PRODUCTION SOFTWARE.


このプログラムは、電子国土v3 の地図タイルを OpenLayers で
表示できるようにするための js ファイルです。

OpenLayers, openlayers4jgsi および 電子国土v3 のソースコードを参考にし、
一部流用し、部分的に内包しています。

あくまでも実験ステータスですので、
本プログラムの一部または全部を用いて商用利用したい場合には、
必ず事前にご連絡ください。

連絡先: kikuchan <at> uranus dti ne jp


【使い方】

  1. JGSIv3.js を script で読み込みます。
  2. 普通に map.addLayer(new OpenLayers.Layer.JGSIv3()); します。


【その他】

  map の projection が EPSG:900913 の時は、
  レイヤー側も自動的に EPSG:900913 になります。

  また、初期化時に JGSIv3({useNativeResolutions: true}) とすると、
  電子国土 v3 のオリジナルのタイルと同じ解像度になります。

