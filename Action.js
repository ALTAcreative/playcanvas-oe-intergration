/**
 * There are no extra steps required to expose functionality from PlayCanvas project -
 * it is available in Origami Engine by default. Every function in every script can be called from Origami Engine
 * as long as that script is attached to some entity in the *root* of PlayCanvas scene hierarchy.
 * 
 * Create an empty entity as a direct Rood child, and attach this script to it.
 * Then create a trigger in Origami Design and assign the action in the following way:
 * 
 *     Entity: <name of your entity here>
 *     Script: Action
 *     Action: doSomething
 * 
 * When the trigger is activated, your PlayCanvas widget shows an alert.
 * You can use this feature in much more sophisticated manner,
 * essentially controlling your widget from container app.
 */


var Action = pc.createScript ('Action');


Action.prototype.initialize = function()
{
    
};


Action.prototype.doSomething = function ()
{
    alert ('Action :: doSomething');
};
