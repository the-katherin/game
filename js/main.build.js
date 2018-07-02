/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		;
/******/ 		head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "34f33baa1bf301e772db"; // eslint-disable-line no-unused-vars
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = []; // eslint-disable-line no-unused-vars
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (typeof dep === "undefined") hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (typeof dep === "undefined") hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "app";
/******/ 			{
/******/ 				// eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app.js":
/*!****************!*\
  !*** ./app.js ***!
  \****************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.scss */ "./style.scss");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_header_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/header/index */ "./components/header/index.js");
/* harmony import */ var _components_section_main_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/section-main/index */ "./components/section-main/index.js");
/* harmony import */ var _components_section_about_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/section-about/index */ "./components/section-about/index.js");
/* harmony import */ var _components_section_speakers_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/section-speakers/index */ "./components/section-speakers/index.js");
/* harmony import */ var _components_section_photos_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/section-photos/index */ "./components/section-photos/index.js");
/* harmony import */ var _components_section_FAQ_index__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/section-FAQ/index */ "./components/section-FAQ/index.js");
/* harmony import */ var _components_section_partners_index__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/section-partners/index */ "./components/section-partners/index.js");
/* harmony import */ var _components_section_destination_index__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/section-destination/index */ "./components/section-destination/index.js");





















const doc = document;
const mainWrapper = doc.getElementById('main');
const sectionsWrapper = doc.getElementById('sections');


let main = [_components_header_index__WEBPACK_IMPORTED_MODULE_1__["Header"], _components_section_main_index__WEBPACK_IMPORTED_MODULE_2__["Main"]];
let sections = [_components_section_about_index__WEBPACK_IMPORTED_MODULE_3__["About"], _components_section_destination_index__WEBPACK_IMPORTED_MODULE_8__["Destination"], _components_section_speakers_index__WEBPACK_IMPORTED_MODULE_4__["Speakers"], _components_section_photos_index__WEBPACK_IMPORTED_MODULE_5__["Photos"], _components_section_FAQ_index__WEBPACK_IMPORTED_MODULE_6__["Faq"], _components_section_partners_index__WEBPACK_IMPORTED_MODULE_7__["Partners"]];

$(document).ready(function () {

    sections.forEach(item => {
        sectionsWrapper.innerHTML += item.html;
    });

    main.forEach(item => {
        mainWrapper.innerHTML += item.html;
    });





    $("#menuToggle").click(function () {

        let lines = doc.getElementsByClassName("nav-toggle__burgerLine");

        $(lines[2]).toggleClass("nav-toggle__burgerLine--hide");
        $(lines[0]).toggleClass("nav-toggle__burgerLine--rotate45d");
        $(lines[1]).toggleClass("nav-toggle__burgerLine--rotate-45d");

        $('#menu').toggleClass("header__nav--show");

    })

})


if (true) {
    module.hot.accept()
}



/***/ }),

/***/ "./components/header/header.html":
/*!***************************************!*\
  !*** ./components/header/header.html ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = "<header class='header'>\r\n\r\n    <div class='header-grid'>\r\n\r\n        <div class=\"header__logo logo\">\r\n\r\n            <a href=\"/\" class=\"logo__link\">\r\n                <img src=\"" + __webpack_require__(/*! ./img/imaguru-logo.png */ "./components/header/img/imaguru-logo.png") + "\" alt=\"\" class='logo__picture'>\r\n\r\n            </a>\r\n\r\n            <a href=\"/\" class=\"logo__link\">\r\n                <img src=\"" + __webpack_require__(/*! ./img/LIAA-logo1.png */ "./components/header/img/LIAA-logo1.png") + "\" alt=\"\" class='logo__picture'>\r\n            </a>\r\n        </div>\r\n\r\n        <button class=\"header__navButton nav-toggle nav-toggle--width \" id='menuToggle'>\r\n            <div class=\"nav-toggle-grid nav-toggle--width\">\r\n                <span class=\"nav-toggle__burgerLine nav-toggle--width\"></span>\r\n                <span class=\"nav-toggle__burgerLine nav-toggle--width\"></span>\r\n                <span class=\"nav-toggle__burgerLine nav-toggle--width\"></span>\r\n            </div>\r\n        </button>\r\n\r\n        <nav class=\" header__nav\" id='menu'>\r\n            <ul class=\"nav-grid\">\r\n                <li>\r\n                    <a href=\"#about\">About</a>\r\n                </li>\r\n                <li>\r\n                    <a href=\"#destination\">Destination</a>\r\n                </li>\r\n                <li>\r\n                    <a href=\"#speakers\">Speakers</a>\r\n                </li>\r\n                <li>\r\n                    <a href=\"#photos\">Photos</a>\r\n                </li>\r\n                <li>\r\n                    <a href=\"#faq\">FAQ</a>\r\n                </li>\r\n                <li>\r\n                    <a href=\"#partners\">Partners</a>\r\n                </li>\r\n            </ul>\r\n        </nav>\r\n\r\n    </div>\r\n\r\n\r\n</header>";

/***/ }),

/***/ "./components/header/img/LIAA-logo1.png":
/*!**********************************************!*\
  !*** ./components/header/img/LIAA-logo1.png ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/LIAA-logo1.png";

/***/ }),

/***/ "./components/header/img/imaguru-logo.png":
/*!************************************************!*\
  !*** ./components/header/img/imaguru-logo.png ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/imaguru-logo.png";

/***/ }),

/***/ "./components/header/index.js":
/*!************************************!*\
  !*** ./components/header/index.js ***!
  \************************************/
/*! exports provided: Header */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Header", function() { return Header; });
/* harmony import */ var _header_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./header.html */ "./components/header/header.html");
/* harmony import */ var _header_html__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_header_html__WEBPACK_IMPORTED_MODULE_0__);
//import './header.scss';



const Header = {};

//import Footer from './comp';

Header.html = _header_html__WEBPACK_IMPORTED_MODULE_0___default.a;



/***/ }),

/***/ "./components/section-FAQ/faq.html":
/*!*****************************************!*\
  !*** ./components/section-FAQ/faq.html ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<section class=\"section-faq\">\r\n    <h2 id='faq'>FAQ</h2>\r\n\r\n\r\n    <div class=\"  question\">\r\n\r\n        <h3 class=\"question__title\">\r\n            How do I get my train ticket?\r\n        </h3>\r\n\r\n        <p class=\"question__answer\">\r\n            The check-in for participants will be organized at Restaurant 1e Klas, located at platform 2B, Amsterdam Central Station.\r\n        </p>\r\n    </div>\r\n\r\n    <div class=\"  question\">\r\n\r\n        <h3 class=\"question__title\">\r\n            From where is the Hackatrain departing?\r\n        </h3>\r\n\r\n        <p class=\"question__answer\">\r\n            The check-in for participants will be organized at Restaurant 1e Klas, located at platform 2B, Amsterdam Central Station.\r\n        </p>\r\n    </div>\r\n\r\n    <div class=\"  question\">\r\n\r\n        <h3 class=\"question__title\">\r\n            What time is the Hackatrain departing?\r\n        </h3>\r\n\r\n        <p class=\"question__answer\">\r\n            The check-in for participants will be organized at Restaurant 1e Klas, located at platform 2B, Amsterdam Central Station.\r\n        </p>\r\n    </div>\r\n\r\n    <div class=\"  question\">\r\n\r\n        <h3 class=\"question__title\">\r\n            What about the return trip?\r\n        </h3>\r\n\r\n        <p class=\"question__answer\">\r\n            The check-in for participants will be organized at Restaurant 1e Klas, located at platform 2B, Amsterdam Central Station.\r\n        </p>\r\n    </div>\r\n\r\n\r\n\r\n\r\n</section>";

/***/ }),

/***/ "./components/section-FAQ/index.js":
/*!*****************************************!*\
  !*** ./components/section-FAQ/index.js ***!
  \*****************************************/
/*! exports provided: Faq */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Faq", function() { return Faq; });
/* harmony import */ var _faq_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./faq.html */ "./components/section-FAQ/faq.html");
/* harmony import */ var _faq_html__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_faq_html__WEBPACK_IMPORTED_MODULE_0__);
//import './faq.scss';



const Faq = {};

//import Footer from './comp';

Faq.html = _faq_html__WEBPACK_IMPORTED_MODULE_0___default.a;



/***/ }),

/***/ "./components/section-about/about.html":
/*!*********************************************!*\
  !*** ./components/section-about/about.html ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<section class=\"section-about\">\r\n\r\n    <h2 id='about'>About</h2>\r\n\r\n\r\n    <p>\r\n        <b>For the first time in Belarus!</b>\r\n    </p>\r\n    <p> Starting at Imaguru on August 30th, continuing on a train in Riga, finishing after our arrival in Riga and ending at\r\n        ///. The now legendary Hackatrain attracts developers, designers and entrepreneurs from all over the world, all hoping\r\n        to strike it big, hackathon-style. This isn’t your typical hackathon. Say goodbye to boring venues and hello to travelling\r\n        around with more than 50 fellow hackers competing across mobility challenges.\r\n\r\n    </p>\r\n\r\n    <p>\r\n        <b>Are you ready for Hackathon on Train Minsk-Riga?</b>\r\n    </p>\r\n\r\n\r\n</section>";

/***/ }),

/***/ "./components/section-about/index.js":
/*!*******************************************!*\
  !*** ./components/section-about/index.js ***!
  \*******************************************/
/*! exports provided: About */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "About", function() { return About; });
/* harmony import */ var _about_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./about.html */ "./components/section-about/about.html");
/* harmony import */ var _about_html__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_about_html__WEBPACK_IMPORTED_MODULE_0__);
//import './about.scss';



const About = {};

//import Footer from './comp';

About.html = _about_html__WEBPACK_IMPORTED_MODULE_0___default.a;



/***/ }),

/***/ "./components/section-destination/destination.html":
/*!*********************************************************!*\
  !*** ./components/section-destination/destination.html ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = "<section class=\"section-destination\">\r\n\r\n    <h2 id='destination'>Destination</h2>\r\n\r\n\r\n\r\n    <img src=\"" + __webpack_require__(/*! ./img/Map.gif */ "./components/section-destination/img/Map.gif") + "\" alt=\"\" class=\"map\">\r\n\r\n\r\n    <div class=\"agenda-grid\">\r\n\r\n        <div class=\"agenda\">\r\n            <h3 class=\"agenda__date\"> Aug 30 </h3>\r\n\r\n            <div class=\"agenda__schedule\">\r\n\r\n                <p> 17:00 - 17:30 Registration</p>\r\n                <p>18:00 - 18:30 Opening Ceremony</p>\r\n                <p>18:30 - 20:00 Pitching in Minsk / Hackathon Starts</p>\r\n            </div>\r\n\r\n        </div>\r\n\r\n        <div class=\"agenda\">\r\n            <h3 class=\"agenda__date\"> Aug 31 </h3>\r\n            <div class=\"agenda__schedule\">\r\n                <p>09:00 - 11:00 Breakfast / Check-point</p>\r\n                <p> 11:00 Mentoring Session</p>\r\n                <p>13:00 - 14:00 Lunch</p>\r\n                <p> 14:00 Mentoring Session</p>\r\n                <p>18:00 - Dinner / Departure for train</p>\r\n                <p> 20:15 - Train departures</p>\r\n                <p>20:15 - … Hacking</p>\r\n\r\n            </div>\r\n\r\n        </div>\r\n\r\n        <div class=\"agenda\">\r\n\r\n            <h3 class=\"agenda__date\"> Sept 1 </h3>\r\n\r\n            <div class=\"agenda__schedule\">\r\n\r\n                <p> 08:00 - Train Arrives to Riga</p>\r\n                <p> 09:00 - 11:00 Breakfast / Check-point</p>\r\n                <p> 11:00 Mentoring Session</p>\r\n                <p> 13:00 - 14:00 Lunch</p>\r\n                <p> 14:00 - 18:00 Final Preparation</p>\r\n                <p> 18:00 - 19:30 Final Stage</p>\r\n                <p> 19:30 - 21:00 Award Ceremony. Party</p>\r\n\r\n\r\n\r\n            </div>\r\n        </div>\r\n\r\n    </div>\r\n\r\n\r\n</section>";

/***/ }),

/***/ "./components/section-destination/img/Map.gif":
/*!****************************************************!*\
  !*** ./components/section-destination/img/Map.gif ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/Map.gif";

/***/ }),

/***/ "./components/section-destination/index.js":
/*!*************************************************!*\
  !*** ./components/section-destination/index.js ***!
  \*************************************************/
/*! exports provided: Destination */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Destination", function() { return Destination; });
/* harmony import */ var _destination_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./destination.html */ "./components/section-destination/destination.html");
/* harmony import */ var _destination_html__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_destination_html__WEBPACK_IMPORTED_MODULE_0__);
//import './destination.scss';



const Destination = {};

Destination.html = _destination_html__WEBPACK_IMPORTED_MODULE_0___default.a;



/***/ }),

/***/ "./components/section-main/img/train.gif":
/*!***********************************************!*\
  !*** ./components/section-main/img/train.gif ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/train.gif";

/***/ }),

/***/ "./components/section-main/index.js":
/*!******************************************!*\
  !*** ./components/section-main/index.js ***!
  \******************************************/
/*! exports provided: Main */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Main", function() { return Main; });
/* harmony import */ var _main_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main.html */ "./components/section-main/main.html");
/* harmony import */ var _main_html__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_main_html__WEBPACK_IMPORTED_MODULE_0__);
//import './main.scss';



const Main = {};

//import Footer from './comp';

Main.html = _main_html__WEBPACK_IMPORTED_MODULE_0___default.a;



/***/ }),

/***/ "./components/section-main/main.html":
/*!*******************************************!*\
  !*** ./components/section-main/main.html ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = "<section class='section-main'>\r\n\r\n    <h1 class='section-main__title'>Imaguru Hackathon on Train\r\n\r\n        <!-- ... -->\r\n        Minsk - Riga\r\n    </h1>\r\n\r\n    <img src=\"" + __webpack_require__(/*! ./img/train.gif */ "./components/section-main/img/train.gif") + "\" alt=\"koko\" class='section-main__trainImg'>\r\n    <h3 class='section-main__date'>August 30 - September 1, 2018</h3>\r\n\r\n    <button class='section-main__registerBtn'>\r\n        <a href=\"\">\r\n            Register\r\n        </a>\r\n    </button>\r\n\r\n\r\n</section>";

/***/ }),

/***/ "./components/section-partners/img/logo-apalon.png":
/*!*********************************************************!*\
  !*** ./components/section-partners/img/logo-apalon.png ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/logo-apalon.png";

/***/ }),

/***/ "./components/section-partners/img/logo-emerline.png":
/*!***********************************************************!*\
  !*** ./components/section-partners/img/logo-emerline.png ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/logo-emerline.png";

/***/ }),

/***/ "./components/section-partners/img/logo-epam.png":
/*!*******************************************************!*\
  !*** ./components/section-partners/img/logo-epam.png ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/logo-epam.png";

/***/ }),

/***/ "./components/section-partners/img/logo-evolution-gaming.png":
/*!*******************************************************************!*\
  !*** ./components/section-partners/img/logo-evolution-gaming.png ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/logo-evolution-gaming.png";

/***/ }),

/***/ "./components/section-partners/img/logo-hqsoftware.png":
/*!*************************************************************!*\
  !*** ./components/section-partners/img/logo-hqsoftware.png ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/logo-hqsoftware.png";

/***/ }),

/***/ "./components/section-partners/img/logo-nikofirm.png":
/*!***********************************************************!*\
  !*** ./components/section-partners/img/logo-nikofirm.png ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/logo-nikofirm.png";

/***/ }),

/***/ "./components/section-partners/img/logo-oxagile.png":
/*!**********************************************************!*\
  !*** ./components/section-partners/img/logo-oxagile.png ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/logo-oxagile.png";

/***/ }),

/***/ "./components/section-partners/img/logo-rs.png":
/*!*****************************************************!*\
  !*** ./components/section-partners/img/logo-rs.png ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/logo-rs.png";

/***/ }),

/***/ "./components/section-partners/index.js":
/*!**********************************************!*\
  !*** ./components/section-partners/index.js ***!
  \**********************************************/
/*! exports provided: Partners */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Partners", function() { return Partners; });
/* harmony import */ var _partners_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./partners.html */ "./components/section-partners/partners.html");
/* harmony import */ var _partners_html__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_partners_html__WEBPACK_IMPORTED_MODULE_0__);
//import './partners.scss';



const Partners = {};

//import Footer from './comp';

Partners.html = _partners_html__WEBPACK_IMPORTED_MODULE_0___default.a;



/***/ }),

/***/ "./components/section-partners/partners.html":
/*!***************************************************!*\
  !*** ./components/section-partners/partners.html ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = "<section class=\"section-partners\">\r\n    <h2 id='partners'>Our partners</h2>\r\n\r\n    <div class=\"diamond partners\">\r\n\r\n        <h4 class=\"partners__title\">Diamond</h4>\r\n\r\n        <div class=\"partners__logos\">\r\n\r\n            <img src=\"" + __webpack_require__(/*! ./img/logo-epam.png */ "./components/section-partners/img/logo-epam.png") + "\" alt=\"\">\r\n            <img src=\"" + __webpack_require__(/*! ./img/logo-rs.png */ "./components/section-partners/img/logo-rs.png") + "\" alt=\"\">\r\n        </div>\r\n\r\n\r\n    </div>\r\n\r\n    <div class=\"gold partners\">\r\n        <h4 class=\"partners__title\">Gold</h4>\r\n\r\n        <div class=\"partners__logos\">\r\n            <img src=\"" + __webpack_require__(/*! ./img/logo-emerline.png */ "./components/section-partners/img/logo-emerline.png") + "\" alt=\"\">\r\n            <img src=\"" + __webpack_require__(/*! ./img/logo-evolution-gaming.png */ "./components/section-partners/img/logo-evolution-gaming.png") + "\" alt=\"\">\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"silver partners\">\r\n        <h4 class=\"partners__title\">Silver</h4>\r\n\r\n        <div class=\"partners__logos\">\r\n            <img src=\"" + __webpack_require__(/*! ./img/logo-hqsoftware.png */ "./components/section-partners/img/logo-hqsoftware.png") + "\" alt=\"\">\r\n            <img src=\"" + __webpack_require__(/*! ./img/logo-oxagile.png */ "./components/section-partners/img/logo-oxagile.png") + "\" alt=\"\">\r\n            <img src=\"" + __webpack_require__(/*! ./img/logo-apalon.png */ "./components/section-partners/img/logo-apalon.png") + "\" alt=\"\">\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"bronze partners\">\r\n\r\n        <h4 class=\"partners__title\">Bronze</h4>\r\n\r\n\r\n\r\n        <div class=\"partners__logos\">\r\n            <img src=\"" + __webpack_require__(/*! ./img/logo-nikofirm.png */ "./components/section-partners/img/logo-nikofirm.png") + "\" alt=\"\">\r\n        </div>\r\n\r\n    </div>\r\n</section>";

/***/ }),

/***/ "./components/section-photos/img/photo1.jpg":
/*!**************************************************!*\
  !*** ./components/section-photos/img/photo1.jpg ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/photo1.jpg";

/***/ }),

/***/ "./components/section-photos/img/photo2.jpg":
/*!**************************************************!*\
  !*** ./components/section-photos/img/photo2.jpg ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/photo2.jpg";

/***/ }),

/***/ "./components/section-photos/img/photo3.jpeg":
/*!***************************************************!*\
  !*** ./components/section-photos/img/photo3.jpeg ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/photo3.jpeg";

/***/ }),

/***/ "./components/section-photos/img/photo4.jpg":
/*!**************************************************!*\
  !*** ./components/section-photos/img/photo4.jpg ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/photo4.jpg";

/***/ }),

/***/ "./components/section-photos/img/photo5.png":
/*!**************************************************!*\
  !*** ./components/section-photos/img/photo5.png ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/photo5.png";

/***/ }),

/***/ "./components/section-photos/img/photo6.jpeg":
/*!***************************************************!*\
  !*** ./components/section-photos/img/photo6.jpeg ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/photo6.jpeg";

/***/ }),

/***/ "./components/section-photos/img/photo7.jpg":
/*!**************************************************!*\
  !*** ./components/section-photos/img/photo7.jpg ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/photo7.jpg";

/***/ }),

/***/ "./components/section-photos/img/photo8.jpg":
/*!**************************************************!*\
  !*** ./components/section-photos/img/photo8.jpg ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/photo8.jpg";

/***/ }),

/***/ "./components/section-photos/img/photo9.jpg":
/*!**************************************************!*\
  !*** ./components/section-photos/img/photo9.jpg ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/photo9.jpg";

/***/ }),

/***/ "./components/section-photos/index.js":
/*!********************************************!*\
  !*** ./components/section-photos/index.js ***!
  \********************************************/
/*! exports provided: Photos */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Photos", function() { return Photos; });
/* harmony import */ var _photos_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./photos.html */ "./components/section-photos/photos.html");
/* harmony import */ var _photos_html__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_photos_html__WEBPACK_IMPORTED_MODULE_0__);
//import './photos.scss';



const Photos = {};

//import Footer from './comp';

Photos.html = _photos_html__WEBPACK_IMPORTED_MODULE_0___default.a;



/***/ }),

/***/ "./components/section-photos/photos.html":
/*!***********************************************!*\
  !*** ./components/section-photos/photos.html ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = "<section class=\"section-photos\">\r\n    <h2 id='photos'>SEE HOW IT WAS</h2>\r\n    <div class=\"photos-grid\">\r\n        <img src=\"" + __webpack_require__(/*! ./img/photo1.jpg */ "./components/section-photos/img/photo1.jpg") + "\" alt=\"\" class=\"photos-grid__photo1 photos-grid__photo--width\">\r\n        <img src=\"" + __webpack_require__(/*! ./img/photo2.jpg */ "./components/section-photos/img/photo2.jpg") + "\" alt=\"\" class=\"photos-grid__photo2 photos-grid__photo--width\">\r\n        <img src=\"" + __webpack_require__(/*! ./img/photo3.jpeg */ "./components/section-photos/img/photo3.jpeg") + "\" alt=\"\" class=\"photos-grid__photo3 photos-grid__photo--width\">\r\n        <img src=\"" + __webpack_require__(/*! ./img/photo4.jpg */ "./components/section-photos/img/photo4.jpg") + "\" alt=\"\" class=\"photos-grid__photo4 photos-grid__photo--width\">\r\n        <img src=\"" + __webpack_require__(/*! ./img/photo5.png */ "./components/section-photos/img/photo5.png") + "\" alt=\"\" class=\"photos-grid__photo5 photos-grid__photo--width\">\r\n        <img src=\"" + __webpack_require__(/*! ./img/photo6.jpeg */ "./components/section-photos/img/photo6.jpeg") + "\" alt=\"\" class=\"photos-grid__photo6 photos-grid__photo--width\">\r\n        <img src=\"" + __webpack_require__(/*! ./img/photo7.jpg */ "./components/section-photos/img/photo7.jpg") + "\" alt=\"\" class=\"photos-grid__photo7 photos-grid__photo--width\">\r\n        <img src=\"" + __webpack_require__(/*! ./img/photo8.jpg */ "./components/section-photos/img/photo8.jpg") + "\" alt=\"\" class=\"photos-grid__photo8 photos-grid__photo--width\">\r\n        <img src=\"" + __webpack_require__(/*! ./img/photo9.jpg */ "./components/section-photos/img/photo9.jpg") + "\" alt=\"\" class=\"photos-grid__photo9 photos-grid__photo--width\">\r\n    </div>\r\n    <button>\r\n        <a href=\"\">See all photos</a>\r\n    </button>\r\n\r\n</section>";

/***/ }),

/***/ "./components/section-speakers/img/speaker1.jpg":
/*!******************************************************!*\
  !*** ./components/section-speakers/img/speaker1.jpg ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/speaker1.jpg";

/***/ }),

/***/ "./components/section-speakers/img/speaker2.jpg":
/*!******************************************************!*\
  !*** ./components/section-speakers/img/speaker2.jpg ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/speaker2.jpg";

/***/ }),

/***/ "./components/section-speakers/img/speaker3.jpg":
/*!******************************************************!*\
  !*** ./components/section-speakers/img/speaker3.jpg ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/speaker3.jpg";

/***/ }),

/***/ "./components/section-speakers/img/speaker4.jpg":
/*!******************************************************!*\
  !*** ./components/section-speakers/img/speaker4.jpg ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/speaker4.jpg";

/***/ }),

/***/ "./components/section-speakers/img/speaker5.jpg":
/*!******************************************************!*\
  !*** ./components/section-speakers/img/speaker5.jpg ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/speaker5.jpg";

/***/ }),

/***/ "./components/section-speakers/index.js":
/*!**********************************************!*\
  !*** ./components/section-speakers/index.js ***!
  \**********************************************/
/*! exports provided: Speakers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Speakers", function() { return Speakers; });
/* harmony import */ var _speakers_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./speakers.html */ "./components/section-speakers/speakers.html");
/* harmony import */ var _speakers_html__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_speakers_html__WEBPACK_IMPORTED_MODULE_0__);
//import './speakers.scss';



const Speakers = {};

//import Footer from './comp';

Speakers.html = _speakers_html__WEBPACK_IMPORTED_MODULE_0___default.a;



/***/ }),

/***/ "./components/section-speakers/speakers.html":
/*!***************************************************!*\
  !*** ./components/section-speakers/speakers.html ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = "<section class=\"section-speakers\">\r\n    <h2 id='speakers'>Speakers</h2>\r\n\r\n    <div class=\"speakers-grid\">\r\n        <div class=\"speaker\">\r\n            <img src=\"" + __webpack_require__(/*! ./img/speaker1.jpg */ "./components/section-speakers/img/speaker1.jpg") + "\" alt=\"\" class='speaker__photo'>\r\n            <a href=\"\" class='speaker__name'>Mark</a>\r\n            <p class=\"speaker__origin\">USA</p>\r\n        </div>\r\n\r\n        <div class=\"speaker\">\r\n            <img src=\"" + __webpack_require__(/*! ./img/speaker2.jpg */ "./components/section-speakers/img/speaker2.jpg") + "\" alt=\"\" class='speaker__photo'>\r\n            <a href=\"\" class='speaker__name'>Lady Gaga</a>\r\n            <p class=\"speaker__origin\">USA</p>\r\n        </div>\r\n\r\n        <div class=\"speaker\">\r\n            <img src=\"" + __webpack_require__(/*! ./img/speaker3.jpg */ "./components/section-speakers/img/speaker3.jpg") + "\" alt=\"\" class='speaker__photo'>\r\n            <a href=\"\" class='speaker__name'>Some buddy</a>\r\n            <p class=\"speaker__origin\">USA</p>\r\n        </div>\r\n\r\n        <div class=\"speaker\">\r\n            <img src=\"" + __webpack_require__(/*! ./img/speaker4.jpg */ "./components/section-speakers/img/speaker4.jpg") + "\" alt=\"\" class='speaker__photo'>\r\n            <a href=\"\" class='speaker__name'>Some buddy</a>\r\n            <p class=\"speaker__origin\">Country</p>\r\n        </div>\r\n\r\n        <div class=\"speaker\">\r\n            <img src=\"" + __webpack_require__(/*! ./img/speaker5.jpg */ "./components/section-speakers/img/speaker5.jpg") + "\" alt=\"\" class='speaker__photo'>\r\n            <a href=\"\" class='speaker__name'>Name</a>\r\n            <p class=\"speaker__origin\">Country</p>\r\n        </div>\r\n\r\n    </div>\r\n\r\n\r\n</section>";

/***/ }),

/***/ "./style.scss":
/*!********************!*\
  !*** ./style.scss ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!**********************!*\
  !*** multi ./app.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./app.js */"./app.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vYXBwLmpzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvaGVhZGVyL2hlYWRlci5odG1sIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvaGVhZGVyL2ltZy9MSUFBLWxvZ28xLnBuZyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL2hlYWRlci9pbWcvaW1hZ3VydS1sb2dvLnBuZyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL2hlYWRlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL3NlY3Rpb24tRkFRL2ZhcS5odG1sIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvc2VjdGlvbi1GQVEvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9zZWN0aW9uLWFib3V0L2Fib3V0Lmh0bWwiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9zZWN0aW9uLWFib3V0L2luZGV4LmpzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvc2VjdGlvbi1kZXN0aW5hdGlvbi9kZXN0aW5hdGlvbi5odG1sIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvc2VjdGlvbi1kZXN0aW5hdGlvbi9pbWcvTWFwLmdpZiIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL3NlY3Rpb24tZGVzdGluYXRpb24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9zZWN0aW9uLW1haW4vaW1nL3RyYWluLmdpZiIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL3NlY3Rpb24tbWFpbi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL3NlY3Rpb24tbWFpbi9tYWluLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9zZWN0aW9uLXBhcnRuZXJzL2ltZy9sb2dvLWFwYWxvbi5wbmciLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9zZWN0aW9uLXBhcnRuZXJzL2ltZy9sb2dvLWVtZXJsaW5lLnBuZyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL3NlY3Rpb24tcGFydG5lcnMvaW1nL2xvZ28tZXBhbS5wbmciLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9zZWN0aW9uLXBhcnRuZXJzL2ltZy9sb2dvLWV2b2x1dGlvbi1nYW1pbmcucG5nIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvc2VjdGlvbi1wYXJ0bmVycy9pbWcvbG9nby1ocXNvZnR3YXJlLnBuZyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL3NlY3Rpb24tcGFydG5lcnMvaW1nL2xvZ28tbmlrb2Zpcm0ucG5nIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvc2VjdGlvbi1wYXJ0bmVycy9pbWcvbG9nby1veGFnaWxlLnBuZyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL3NlY3Rpb24tcGFydG5lcnMvaW1nL2xvZ28tcnMucG5nIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvc2VjdGlvbi1wYXJ0bmVycy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL3NlY3Rpb24tcGFydG5lcnMvcGFydG5lcnMuaHRtbCIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL3NlY3Rpb24tcGhvdG9zL2ltZy9waG90bzEuanBnIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvc2VjdGlvbi1waG90b3MvaW1nL3Bob3RvMi5qcGciLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9zZWN0aW9uLXBob3Rvcy9pbWcvcGhvdG8zLmpwZWciLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9zZWN0aW9uLXBob3Rvcy9pbWcvcGhvdG80LmpwZyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL3NlY3Rpb24tcGhvdG9zL2ltZy9waG90bzUucG5nIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvc2VjdGlvbi1waG90b3MvaW1nL3Bob3RvNi5qcGVnIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvc2VjdGlvbi1waG90b3MvaW1nL3Bob3RvNy5qcGciLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9zZWN0aW9uLXBob3Rvcy9pbWcvcGhvdG84LmpwZyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL3NlY3Rpb24tcGhvdG9zL2ltZy9waG90bzkuanBnIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvc2VjdGlvbi1waG90b3MvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9zZWN0aW9uLXBob3Rvcy9waG90b3MuaHRtbCIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL3NlY3Rpb24tc3BlYWtlcnMvaW1nL3NwZWFrZXIxLmpwZyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL3NlY3Rpb24tc3BlYWtlcnMvaW1nL3NwZWFrZXIyLmpwZyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL3NlY3Rpb24tc3BlYWtlcnMvaW1nL3NwZWFrZXIzLmpwZyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL3NlY3Rpb24tc3BlYWtlcnMvaW1nL3NwZWFrZXI0LmpwZyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL3NlY3Rpb24tc3BlYWtlcnMvaW1nL3NwZWFrZXI1LmpwZyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL3NlY3Rpb24tc3BlYWtlcnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9zZWN0aW9uLXNwZWFrZXJzL3NwZWFrZXJzLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vc3R5bGUuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsZUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQUk7QUFDSjs7QUFFQTtBQUNBLHNEQUE4QztBQUM5QztBQUNBO0FBQ0Esb0NBQTRCO0FBQzVCLHFDQUE2QjtBQUM3Qix5Q0FBaUM7O0FBRWpDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBNkI7QUFDN0IscUNBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUFxQixnQkFBZ0I7QUFDckM7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSw2QkFBcUIsZ0JBQWdCO0FBQ3JDO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGFBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsYUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMEJBQWtCLDhCQUE4QjtBQUNoRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsZUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBb0IsMkJBQTJCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDJCQUFtQixjQUFjO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx3QkFBZ0IsS0FBSztBQUNyQjtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUFnQixZQUFZO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esc0JBQWMsNEJBQTRCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLHVCQUFlLDRCQUE0QjtBQUMzQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHVCQUFlLDRCQUE0QjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQWlCLHVDQUF1QztBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUFpQix1Q0FBdUM7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBaUIsc0JBQXNCO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBLGdCQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxzQkFBYyx3Q0FBd0M7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxlQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFJO0FBQ0o7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0EsOENBQXNDLHVCQUF1Qjs7O0FBRzdEO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNseEJBOztBQUVpQjs7QUFFRjs7QUFFQzs7QUFFRzs7QUFFRjs7QUFFSDs7QUFFSzs7QUFFRzs7OztBQUl0QjtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLEtBQUs7Ozs7OztBQU1MOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxLQUFLOztBQUVMLENBQUM7OztBQUdEO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQzVEQSw4MUQ7Ozs7Ozs7Ozs7O0FDQUEsOEQ7Ozs7Ozs7Ozs7O0FDQUEsZ0U7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFBQTtBQUFBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOzs7Ozs7Ozs7Ozs7O0FDUkEsK2hEOzs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQUE7QUFBQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7Ozs7Ozs7Ozs7OztBQ1JBLCt3Qjs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUFBO0FBQUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7Ozs7Ozs7Ozs7Ozs7QUNSQSxnMkQ7Ozs7Ozs7Ozs7O0FDQUEsdUQ7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFBQTtBQUFBOztBQUVBOztBQUVBOztBQUVBOzs7Ozs7Ozs7Ozs7O0FDTkEseUQ7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFBQTtBQUFBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOzs7Ozs7Ozs7Ozs7O0FDUkEsbWtCOzs7Ozs7Ozs7OztBQ0FBLCtEOzs7Ozs7Ozs7OztBQ0FBLGlFOzs7Ozs7Ozs7OztBQ0FBLDZEOzs7Ozs7Ozs7OztBQ0FBLHlFOzs7Ozs7Ozs7OztBQ0FBLG1FOzs7Ozs7Ozs7OztBQ0FBLGlFOzs7Ozs7Ozs7OztBQ0FBLGdFOzs7Ozs7Ozs7OztBQ0FBLDJEOzs7Ozs7Ozs7Ozs7OztBQ0FBO0FBQUE7QUFBQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7Ozs7Ozs7Ozs7OztBQ1JBLHFnRTs7Ozs7Ozs7Ozs7QUNBQSwwRDs7Ozs7Ozs7Ozs7QUNBQSwwRDs7Ozs7Ozs7Ozs7QUNBQSwyRDs7Ozs7Ozs7Ozs7QUNBQSwwRDs7Ozs7Ozs7Ozs7QUNBQSwwRDs7Ozs7Ozs7Ozs7QUNBQSwyRDs7Ozs7Ozs7Ozs7QUNBQSwwRDs7Ozs7Ozs7Ozs7QUNBQSwwRDs7Ozs7Ozs7Ozs7QUNBQSwwRDs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUFBO0FBQUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7Ozs7Ozs7Ozs7Ozs7QUNSQSxnNUQ7Ozs7Ozs7Ozs7O0FDQUEsNEQ7Ozs7Ozs7Ozs7O0FDQUEsNEQ7Ozs7Ozs7Ozs7O0FDQUEsNEQ7Ozs7Ozs7Ozs7O0FDQUEsNEQ7Ozs7Ozs7Ozs7O0FDQUEsNEQ7Ozs7Ozs7Ozs7Ozs7O0FDQUE7QUFBQTtBQUFBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOzs7Ozs7Ozs7Ozs7O0FDUkEsczBEOzs7Ozs7Ozs7OztBQ0FBLHlDIiwiZmlsZSI6ImpzL21haW4uYnVpbGQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHRmdW5jdGlvbiBob3REaXNwb3NlQ2h1bmsoY2h1bmtJZCkge1xuIFx0XHRkZWxldGUgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0fVxuIFx0dmFyIHBhcmVudEhvdFVwZGF0ZUNhbGxiYWNrID0gd2luZG93W1wid2VicGFja0hvdFVwZGF0ZVwiXTtcbiBcdHdpbmRvd1tcIndlYnBhY2tIb3RVcGRhdGVcIl0gPSAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIHdlYnBhY2tIb3RVcGRhdGVDYWxsYmFjayhjaHVua0lkLCBtb3JlTW9kdWxlcykge1xuIFx0XHRob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcyk7XG4gXHRcdGlmIChwYXJlbnRIb3RVcGRhdGVDYWxsYmFjaykgcGFyZW50SG90VXBkYXRlQ2FsbGJhY2soY2h1bmtJZCwgbW9yZU1vZHVsZXMpO1xuIFx0fSA7XG5cbiBcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0ZnVuY3Rpb24gaG90RG93bmxvYWRVcGRhdGVDaHVuayhjaHVua0lkKSB7XG4gXHRcdHZhciBoZWFkID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdO1xuIFx0XHR2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiBcdFx0c2NyaXB0LmNoYXJzZXQgPSBcInV0Zi04XCI7XG4gXHRcdHNjcmlwdC5zcmMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgY2h1bmtJZCArIFwiLlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzXCI7XG4gXHRcdDtcbiBcdFx0aGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdERvd25sb2FkTWFuaWZlc3QocmVxdWVzdFRpbWVvdXQpIHtcbiBcdFx0cmVxdWVzdFRpbWVvdXQgPSByZXF1ZXN0VGltZW91dCB8fCAxMDAwMDtcbiBcdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdGlmICh0eXBlb2YgWE1MSHR0cFJlcXVlc3QgPT09IFwidW5kZWZpbmVkXCIpIHtcbiBcdFx0XHRcdHJldHVybiByZWplY3QobmV3IEVycm9yKFwiTm8gYnJvd3NlciBzdXBwb3J0XCIpKTtcbiBcdFx0XHR9XG4gXHRcdFx0dHJ5IHtcbiBcdFx0XHRcdHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gXHRcdFx0XHR2YXIgcmVxdWVzdFBhdGggPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBcIlwiICsgaG90Q3VycmVudEhhc2ggKyBcIi5ob3QtdXBkYXRlLmpzb25cIjtcbiBcdFx0XHRcdHJlcXVlc3Qub3BlbihcIkdFVFwiLCByZXF1ZXN0UGF0aCwgdHJ1ZSk7XG4gXHRcdFx0XHRyZXF1ZXN0LnRpbWVvdXQgPSByZXF1ZXN0VGltZW91dDtcbiBcdFx0XHRcdHJlcXVlc3Quc2VuZChudWxsKTtcbiBcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdHJldHVybiByZWplY3QoZXJyKTtcbiBcdFx0XHR9XG4gXHRcdFx0cmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiBcdFx0XHRcdGlmIChyZXF1ZXN0LnJlYWR5U3RhdGUgIT09IDQpIHJldHVybjtcbiBcdFx0XHRcdGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMCkge1xuIFx0XHRcdFx0XHQvLyB0aW1lb3V0XG4gXHRcdFx0XHRcdHJlamVjdChcbiBcdFx0XHRcdFx0XHRuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiB0aW1lZCBvdXQuXCIpXG4gXHRcdFx0XHRcdCk7XG4gXHRcdFx0XHR9IGVsc2UgaWYgKHJlcXVlc3Quc3RhdHVzID09PSA0MDQpIHtcbiBcdFx0XHRcdFx0Ly8gbm8gdXBkYXRlIGF2YWlsYWJsZVxuIFx0XHRcdFx0XHRyZXNvbHZlKCk7XG4gXHRcdFx0XHR9IGVsc2UgaWYgKHJlcXVlc3Quc3RhdHVzICE9PSAyMDAgJiYgcmVxdWVzdC5zdGF0dXMgIT09IDMwNCkge1xuIFx0XHRcdFx0XHQvLyBvdGhlciBmYWlsdXJlXG4gXHRcdFx0XHRcdHJlamVjdChuZXcgRXJyb3IoXCJNYW5pZmVzdCByZXF1ZXN0IHRvIFwiICsgcmVxdWVzdFBhdGggKyBcIiBmYWlsZWQuXCIpKTtcbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdC8vIHN1Y2Nlc3NcbiBcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHR2YXIgdXBkYXRlID0gSlNPTi5wYXJzZShyZXF1ZXN0LnJlc3BvbnNlVGV4dCk7XG4gXHRcdFx0XHRcdH0gY2F0Y2ggKGUpIHtcbiBcdFx0XHRcdFx0XHRyZWplY3QoZSk7XG4gXHRcdFx0XHRcdFx0cmV0dXJuO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdHJlc29sdmUodXBkYXRlKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9O1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0dmFyIGhvdEFwcGx5T25VcGRhdGUgPSB0cnVlO1xuIFx0dmFyIGhvdEN1cnJlbnRIYXNoID0gXCIzNGYzM2JhYTFiZjMwMWU3NzJkYlwiOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gXHR2YXIgaG90UmVxdWVzdFRpbWVvdXQgPSAxMDAwMDtcbiBcdHZhciBob3RDdXJyZW50TW9kdWxlRGF0YSA9IHt9O1xuIFx0dmFyIGhvdEN1cnJlbnRDaGlsZE1vZHVsZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuIFx0dmFyIGhvdEN1cnJlbnRQYXJlbnRzID0gW107IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdHZhciBob3RDdXJyZW50UGFyZW50c1RlbXAgPSBbXTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZVJlcXVpcmUobW9kdWxlSWQpIHtcbiBcdFx0dmFyIG1lID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdGlmICghbWUpIHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fO1xuIFx0XHR2YXIgZm4gPSBmdW5jdGlvbihyZXF1ZXN0KSB7XG4gXHRcdFx0aWYgKG1lLmhvdC5hY3RpdmUpIHtcbiBcdFx0XHRcdGlmIChpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdKSB7XG4gXHRcdFx0XHRcdGlmIChpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCkgPT09IC0xKSB7XG4gXHRcdFx0XHRcdFx0aW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzLnB1c2gobW9kdWxlSWQpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG4gXHRcdFx0XHRcdGhvdEN1cnJlbnRDaGlsZE1vZHVsZSA9IHJlcXVlc3Q7XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAobWUuY2hpbGRyZW4uaW5kZXhPZihyZXF1ZXN0KSA9PT0gLTEpIHtcbiBcdFx0XHRcdFx0bWUuY2hpbGRyZW4ucHVzaChyZXF1ZXN0KTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9IGVsc2Uge1xuIFx0XHRcdFx0Y29uc29sZS53YXJuKFxuIFx0XHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArXG4gXHRcdFx0XHRcdFx0cmVxdWVzdCArXG4gXHRcdFx0XHRcdFx0XCIpIGZyb20gZGlzcG9zZWQgbW9kdWxlIFwiICtcbiBcdFx0XHRcdFx0XHRtb2R1bGVJZFxuIFx0XHRcdFx0KTtcbiBcdFx0XHRcdGhvdEN1cnJlbnRQYXJlbnRzID0gW107XG4gXHRcdFx0fVxuIFx0XHRcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKHJlcXVlc3QpO1xuIFx0XHR9O1xuIFx0XHR2YXIgT2JqZWN0RmFjdG9yeSA9IGZ1bmN0aW9uIE9iamVjdEZhY3RvcnkobmFtZSkge1xuIFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IHRydWUsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcbiBcdFx0XHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX19bbmFtZV07XG4gXHRcdFx0XHR9LFxuIFx0XHRcdFx0c2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuIFx0XHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fW25hbWVdID0gdmFsdWU7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fTtcbiBcdFx0fTtcbiBcdFx0Zm9yICh2YXIgbmFtZSBpbiBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKF9fd2VicGFja19yZXF1aXJlX18sIG5hbWUpICYmXG4gXHRcdFx0XHRuYW1lICE9PSBcImVcIiAmJlxuIFx0XHRcdFx0bmFtZSAhPT0gXCJ0XCJcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShmbiwgbmFtZSwgT2JqZWN0RmFjdG9yeShuYW1lKSk7XG4gXHRcdFx0fVxuIFx0XHR9XG4gXHRcdGZuLmUgPSBmdW5jdGlvbihjaHVua0lkKSB7XG4gXHRcdFx0aWYgKGhvdFN0YXR1cyA9PT0gXCJyZWFkeVwiKSBob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xuIFx0XHRcdGhvdENodW5rc0xvYWRpbmcrKztcbiBcdFx0XHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5lKGNodW5rSWQpLnRoZW4oZmluaXNoQ2h1bmtMb2FkaW5nLCBmdW5jdGlvbihlcnIpIHtcbiBcdFx0XHRcdGZpbmlzaENodW5rTG9hZGluZygpO1xuIFx0XHRcdFx0dGhyb3cgZXJyO1xuIFx0XHRcdH0pO1xuXG4gXHRcdFx0ZnVuY3Rpb24gZmluaXNoQ2h1bmtMb2FkaW5nKCkge1xuIFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZy0tO1xuIFx0XHRcdFx0aWYgKGhvdFN0YXR1cyA9PT0gXCJwcmVwYXJlXCIpIHtcbiBcdFx0XHRcdFx0aWYgKCFob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0pIHtcbiBcdFx0XHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAoaG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJiBob3RXYWl0aW5nRmlsZXMgPT09IDApIHtcbiBcdFx0XHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH07XG4gXHRcdGZuLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRcdGlmIChtb2RlICYgMSkgdmFsdWUgPSBmbih2YWx1ZSk7XG4gXHRcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18udCh2YWx1ZSwgbW9kZSAmIH4xKTtcbiBcdFx0fTtcbiBcdFx0cmV0dXJuIGZuO1xuIFx0fVxuXG4gXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiBcdGZ1bmN0aW9uIGhvdENyZWF0ZU1vZHVsZShtb2R1bGVJZCkge1xuIFx0XHR2YXIgaG90ID0ge1xuIFx0XHRcdC8vIHByaXZhdGUgc3R1ZmZcbiBcdFx0XHRfYWNjZXB0ZWREZXBlbmRlbmNpZXM6IHt9LFxuIFx0XHRcdF9kZWNsaW5lZERlcGVuZGVuY2llczoge30sXG4gXHRcdFx0X3NlbGZBY2NlcHRlZDogZmFsc2UsXG4gXHRcdFx0X3NlbGZEZWNsaW5lZDogZmFsc2UsXG4gXHRcdFx0X2Rpc3Bvc2VIYW5kbGVyczogW10sXG4gXHRcdFx0X21haW46IGhvdEN1cnJlbnRDaGlsZE1vZHVsZSAhPT0gbW9kdWxlSWQsXG5cbiBcdFx0XHQvLyBNb2R1bGUgQVBJXG4gXHRcdFx0YWN0aXZlOiB0cnVlLFxuIFx0XHRcdGFjY2VwdDogZnVuY3Rpb24oZGVwLCBjYWxsYmFjaykge1xuIFx0XHRcdFx0aWYgKHR5cGVvZiBkZXAgPT09IFwidW5kZWZpbmVkXCIpIGhvdC5fc2VsZkFjY2VwdGVkID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwiZnVuY3Rpb25cIikgaG90Ll9zZWxmQWNjZXB0ZWQgPSBkZXA7XG4gXHRcdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKVxuIFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcbiBcdFx0XHRcdFx0XHRob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xuIFx0XHRcdFx0ZWxzZSBob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcF0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbigpIHt9O1xuIFx0XHRcdH0sXG4gXHRcdFx0ZGVjbGluZTogZnVuY3Rpb24oZGVwKSB7XG4gXHRcdFx0XHRpZiAodHlwZW9mIGRlcCA9PT0gXCJ1bmRlZmluZWRcIikgaG90Ll9zZWxmRGVjbGluZWQgPSB0cnVlO1xuIFx0XHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIilcbiBcdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspXG4gXHRcdFx0XHRcdFx0aG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBbaV1dID0gdHJ1ZTtcbiBcdFx0XHRcdGVsc2UgaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1tkZXBdID0gdHJ1ZTtcbiBcdFx0XHR9LFxuIFx0XHRcdGRpc3Bvc2U6IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gXHRcdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcbiBcdFx0XHR9LFxuIFx0XHRcdGFkZERpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbihjYWxsYmFjaykge1xuIFx0XHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG4gXHRcdFx0fSxcbiBcdFx0XHRyZW1vdmVEaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24oY2FsbGJhY2spIHtcbiBcdFx0XHRcdHZhciBpZHggPSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5pbmRleE9mKGNhbGxiYWNrKTtcbiBcdFx0XHRcdGlmIChpZHggPj0gMCkgaG90Ll9kaXNwb3NlSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gXHRcdFx0fSxcblxuIFx0XHRcdC8vIE1hbmFnZW1lbnQgQVBJXG4gXHRcdFx0Y2hlY2s6IGhvdENoZWNrLFxuIFx0XHRcdGFwcGx5OiBob3RBcHBseSxcbiBcdFx0XHRzdGF0dXM6IGZ1bmN0aW9uKGwpIHtcbiBcdFx0XHRcdGlmICghbCkgcmV0dXJuIGhvdFN0YXR1cztcbiBcdFx0XHRcdGhvdFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG4gXHRcdFx0fSxcbiBcdFx0XHRhZGRTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbihsKSB7XG4gXHRcdFx0XHRob3RTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xuIFx0XHRcdH0sXG4gXHRcdFx0cmVtb3ZlU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24obCkge1xuIFx0XHRcdFx0dmFyIGlkeCA9IGhvdFN0YXR1c0hhbmRsZXJzLmluZGV4T2YobCk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIGhvdFN0YXR1c0hhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdH0sXG5cbiBcdFx0XHQvL2luaGVyaXQgZnJvbSBwcmV2aW91cyBkaXNwb3NlIGNhbGxcbiBcdFx0XHRkYXRhOiBob3RDdXJyZW50TW9kdWxlRGF0YVttb2R1bGVJZF1cbiBcdFx0fTtcbiBcdFx0aG90Q3VycmVudENoaWxkTW9kdWxlID0gdW5kZWZpbmVkO1xuIFx0XHRyZXR1cm4gaG90O1xuIFx0fVxuXG4gXHR2YXIgaG90U3RhdHVzSGFuZGxlcnMgPSBbXTtcbiBcdHZhciBob3RTdGF0dXMgPSBcImlkbGVcIjtcblxuIFx0ZnVuY3Rpb24gaG90U2V0U3RhdHVzKG5ld1N0YXR1cykge1xuIFx0XHRob3RTdGF0dXMgPSBuZXdTdGF0dXM7XG4gXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgaG90U3RhdHVzSGFuZGxlcnMubGVuZ3RoOyBpKyspXG4gXHRcdFx0aG90U3RhdHVzSGFuZGxlcnNbaV0uY2FsbChudWxsLCBuZXdTdGF0dXMpO1xuIFx0fVxuXG4gXHQvLyB3aGlsZSBkb3dubG9hZGluZ1xuIFx0dmFyIGhvdFdhaXRpbmdGaWxlcyA9IDA7XG4gXHR2YXIgaG90Q2h1bmtzTG9hZGluZyA9IDA7XG4gXHR2YXIgaG90V2FpdGluZ0ZpbGVzTWFwID0ge307XG4gXHR2YXIgaG90UmVxdWVzdGVkRmlsZXNNYXAgPSB7fTtcbiBcdHZhciBob3RBdmFpbGFibGVGaWxlc01hcCA9IHt9O1xuIFx0dmFyIGhvdERlZmVycmVkO1xuXG4gXHQvLyBUaGUgdXBkYXRlIGluZm9cbiBcdHZhciBob3RVcGRhdGUsIGhvdFVwZGF0ZU5ld0hhc2g7XG5cbiBcdGZ1bmN0aW9uIHRvTW9kdWxlSWQoaWQpIHtcbiBcdFx0dmFyIGlzTnVtYmVyID0gK2lkICsgXCJcIiA9PT0gaWQ7XG4gXHRcdHJldHVybiBpc051bWJlciA/ICtpZCA6IGlkO1xuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RDaGVjayhhcHBseSkge1xuIFx0XHRpZiAoaG90U3RhdHVzICE9PSBcImlkbGVcIikge1xuIFx0XHRcdHRocm93IG5ldyBFcnJvcihcImNoZWNrKCkgaXMgb25seSBhbGxvd2VkIGluIGlkbGUgc3RhdHVzXCIpO1xuIFx0XHR9XG4gXHRcdGhvdEFwcGx5T25VcGRhdGUgPSBhcHBseTtcbiBcdFx0aG90U2V0U3RhdHVzKFwiY2hlY2tcIik7XG4gXHRcdHJldHVybiBob3REb3dubG9hZE1hbmlmZXN0KGhvdFJlcXVlc3RUaW1lb3V0KS50aGVuKGZ1bmN0aW9uKHVwZGF0ZSkge1xuIFx0XHRcdGlmICghdXBkYXRlKSB7XG4gXHRcdFx0XHRob3RTZXRTdGF0dXMoXCJpZGxlXCIpO1xuIFx0XHRcdFx0cmV0dXJuIG51bGw7XG4gXHRcdFx0fVxuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwID0ge307XG4gXHRcdFx0aG90V2FpdGluZ0ZpbGVzTWFwID0ge307XG4gXHRcdFx0aG90QXZhaWxhYmxlRmlsZXNNYXAgPSB1cGRhdGUuYztcbiBcdFx0XHRob3RVcGRhdGVOZXdIYXNoID0gdXBkYXRlLmg7XG5cbiBcdFx0XHRob3RTZXRTdGF0dXMoXCJwcmVwYXJlXCIpO1xuIFx0XHRcdHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gXHRcdFx0XHRob3REZWZlcnJlZCA9IHtcbiBcdFx0XHRcdFx0cmVzb2x2ZTogcmVzb2x2ZSxcbiBcdFx0XHRcdFx0cmVqZWN0OiByZWplY3RcbiBcdFx0XHRcdH07XG4gXHRcdFx0fSk7XG4gXHRcdFx0aG90VXBkYXRlID0ge307XG4gXHRcdFx0dmFyIGNodW5rSWQgPSBcImFwcFwiO1xuIFx0XHRcdHtcbiBcdFx0XHRcdC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbG9uZS1ibG9ja3NcbiBcdFx0XHRcdC8qZ2xvYmFscyBjaHVua0lkICovXG4gXHRcdFx0XHRob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0aG90U3RhdHVzID09PSBcInByZXBhcmVcIiAmJlxuIFx0XHRcdFx0aG90Q2h1bmtzTG9hZGluZyA9PT0gMCAmJlxuIFx0XHRcdFx0aG90V2FpdGluZ0ZpbGVzID09PSAwXG4gXHRcdFx0KSB7XG4gXHRcdFx0XHRob3RVcGRhdGVEb3dubG9hZGVkKCk7XG4gXHRcdFx0fVxuIFx0XHRcdHJldHVybiBwcm9taXNlO1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gXHRmdW5jdGlvbiBob3RBZGRVcGRhdGVDaHVuayhjaHVua0lkLCBtb3JlTW9kdWxlcykge1xuIFx0XHRpZiAoIWhvdEF2YWlsYWJsZUZpbGVzTWFwW2NodW5rSWRdIHx8ICFob3RSZXF1ZXN0ZWRGaWxlc01hcFtjaHVua0lkXSlcbiBcdFx0XHRyZXR1cm47XG4gXHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gZmFsc2U7XG4gXHRcdGZvciAodmFyIG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRob3RVcGRhdGVbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRpZiAoLS1ob3RXYWl0aW5nRmlsZXMgPT09IDAgJiYgaG90Q2h1bmtzTG9hZGluZyA9PT0gMCkge1xuIFx0XHRcdGhvdFVwZGF0ZURvd25sb2FkZWQoKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RFbnN1cmVVcGRhdGVDaHVuayhjaHVua0lkKSB7XG4gXHRcdGlmICghaG90QXZhaWxhYmxlRmlsZXNNYXBbY2h1bmtJZF0pIHtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXNNYXBbY2h1bmtJZF0gPSB0cnVlO1xuIFx0XHR9IGVsc2Uge1xuIFx0XHRcdGhvdFJlcXVlc3RlZEZpbGVzTWFwW2NodW5rSWRdID0gdHJ1ZTtcbiBcdFx0XHRob3RXYWl0aW5nRmlsZXMrKztcbiBcdFx0XHRob3REb3dubG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpO1xuIFx0XHR9XG4gXHR9XG5cbiBcdGZ1bmN0aW9uIGhvdFVwZGF0ZURvd25sb2FkZWQoKSB7XG4gXHRcdGhvdFNldFN0YXR1cyhcInJlYWR5XCIpO1xuIFx0XHR2YXIgZGVmZXJyZWQgPSBob3REZWZlcnJlZDtcbiBcdFx0aG90RGVmZXJyZWQgPSBudWxsO1xuIFx0XHRpZiAoIWRlZmVycmVkKSByZXR1cm47XG4gXHRcdGlmIChob3RBcHBseU9uVXBkYXRlKSB7XG4gXHRcdFx0Ly8gV3JhcCBkZWZlcnJlZCBvYmplY3QgaW4gUHJvbWlzZSB0byBtYXJrIGl0IGFzIGEgd2VsbC1oYW5kbGVkIFByb21pc2UgdG9cbiBcdFx0XHQvLyBhdm9pZCB0cmlnZ2VyaW5nIHVuY2F1Z2h0IGV4Y2VwdGlvbiB3YXJuaW5nIGluIENocm9tZS5cbiBcdFx0XHQvLyBTZWUgaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9NDY1NjY2XG4gXHRcdFx0UHJvbWlzZS5yZXNvbHZlKClcbiBcdFx0XHRcdC50aGVuKGZ1bmN0aW9uKCkge1xuIFx0XHRcdFx0XHRyZXR1cm4gaG90QXBwbHkoaG90QXBwbHlPblVwZGF0ZSk7XG4gXHRcdFx0XHR9KVxuIFx0XHRcdFx0LnRoZW4oXG4gXHRcdFx0XHRcdGZ1bmN0aW9uKHJlc3VsdCkge1xuIFx0XHRcdFx0XHRcdGRlZmVycmVkLnJlc29sdmUocmVzdWx0KTtcbiBcdFx0XHRcdFx0fSxcbiBcdFx0XHRcdFx0ZnVuY3Rpb24oZXJyKSB7XG4gXHRcdFx0XHRcdFx0ZGVmZXJyZWQucmVqZWN0KGVycik7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdCk7XG4gXHRcdH0gZWxzZSB7XG4gXHRcdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuIFx0XHRcdGZvciAodmFyIGlkIGluIGhvdFVwZGF0ZSkge1xuIFx0XHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaCh0b01vZHVsZUlkKGlkKSk7XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHRcdGRlZmVycmVkLnJlc29sdmUob3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0fVxuIFx0fVxuXG4gXHRmdW5jdGlvbiBob3RBcHBseShvcHRpb25zKSB7XG4gXHRcdGlmIChob3RTdGF0dXMgIT09IFwicmVhZHlcIilcbiBcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJhcHBseSgpIGlzIG9ubHkgYWxsb3dlZCBpbiByZWFkeSBzdGF0dXNcIik7XG4gXHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gXHRcdHZhciBjYjtcbiBcdFx0dmFyIGk7XG4gXHRcdHZhciBqO1xuIFx0XHR2YXIgbW9kdWxlO1xuIFx0XHR2YXIgbW9kdWxlSWQ7XG5cbiBcdFx0ZnVuY3Rpb24gZ2V0QWZmZWN0ZWRTdHVmZih1cGRhdGVNb2R1bGVJZCkge1xuIFx0XHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbdXBkYXRlTW9kdWxlSWRdO1xuIFx0XHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuXG4gXHRcdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLnNsaWNlKCkubWFwKGZ1bmN0aW9uKGlkKSB7XG4gXHRcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0XHRjaGFpbjogW2lkXSxcbiBcdFx0XHRcdFx0aWQ6IGlkXG4gXHRcdFx0XHR9O1xuIFx0XHRcdH0pO1xuIFx0XHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG4gXHRcdFx0XHR2YXIgcXVldWVJdGVtID0gcXVldWUucG9wKCk7XG4gXHRcdFx0XHR2YXIgbW9kdWxlSWQgPSBxdWV1ZUl0ZW0uaWQ7XG4gXHRcdFx0XHR2YXIgY2hhaW4gPSBxdWV1ZUl0ZW0uY2hhaW47XG4gXHRcdFx0XHRtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdGlmICghbW9kdWxlIHx8IG1vZHVsZS5ob3QuX3NlbGZBY2NlcHRlZCkgY29udGludWU7XG4gXHRcdFx0XHRpZiAobW9kdWxlLmhvdC5fc2VsZkRlY2xpbmVkKSB7XG4gXHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuIFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuIFx0XHRcdFx0XHR9O1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKG1vZHVsZS5ob3QuX21haW4pIHtcbiBcdFx0XHRcdFx0cmV0dXJuIHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcInVuYWNjZXB0ZWRcIixcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1vZHVsZS5wYXJlbnRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdHZhciBwYXJlbnRJZCA9IG1vZHVsZS5wYXJlbnRzW2ldO1xuIFx0XHRcdFx0XHR2YXIgcGFyZW50ID0gaW5zdGFsbGVkTW9kdWxlc1twYXJlbnRJZF07XG4gXHRcdFx0XHRcdGlmICghcGFyZW50KSBjb250aW51ZTtcbiBcdFx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuIFx0XHRcdFx0XHRcdHJldHVybiB7XG4gXHRcdFx0XHRcdFx0XHR0eXBlOiBcImRlY2xpbmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuIFx0XHRcdFx0XHRcdFx0cGFyZW50SWQ6IHBhcmVudElkXG4gXHRcdFx0XHRcdFx0fTtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRpZiAob3V0ZGF0ZWRNb2R1bGVzLmluZGV4T2YocGFyZW50SWQpICE9PSAtMSkgY29udGludWU7XG4gXHRcdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSlcbiBcdFx0XHRcdFx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSA9IFtdO1xuIFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXSwgW21vZHVsZUlkXSk7XG4gXHRcdFx0XHRcdFx0Y29udGludWU7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW3BhcmVudElkXTtcbiBcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2gocGFyZW50SWQpO1xuIFx0XHRcdFx0XHRxdWV1ZS5wdXNoKHtcbiBcdFx0XHRcdFx0XHRjaGFpbjogY2hhaW4uY29uY2F0KFtwYXJlbnRJZF0pLFxuIFx0XHRcdFx0XHRcdGlkOiBwYXJlbnRJZFxuIFx0XHRcdFx0XHR9KTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG5cbiBcdFx0XHRyZXR1cm4ge1xuIFx0XHRcdFx0dHlwZTogXCJhY2NlcHRlZFwiLFxuIFx0XHRcdFx0bW9kdWxlSWQ6IHVwZGF0ZU1vZHVsZUlkLFxuIFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzOiBvdXRkYXRlZE1vZHVsZXMsXG4gXHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llczogb3V0ZGF0ZWREZXBlbmRlbmNpZXNcbiBcdFx0XHR9O1xuIFx0XHR9XG5cbiBcdFx0ZnVuY3Rpb24gYWRkQWxsVG9TZXQoYSwgYikge1xuIFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYi5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0dmFyIGl0ZW0gPSBiW2ldO1xuIFx0XHRcdFx0aWYgKGEuaW5kZXhPZihpdGVtKSA9PT0gLTEpIGEucHVzaChpdGVtKTtcbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBhdCBiZWdpbiBhbGwgdXBkYXRlcyBtb2R1bGVzIGFyZSBvdXRkYXRlZFxuIFx0XHQvLyB0aGUgXCJvdXRkYXRlZFwiIHN0YXR1cyBjYW4gcHJvcGFnYXRlIHRvIHBhcmVudHMgaWYgdGhleSBkb24ndCBhY2NlcHQgdGhlIGNoaWxkcmVuXG4gXHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuIFx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVzID0gW107XG4gXHRcdHZhciBhcHBsaWVkVXBkYXRlID0ge307XG5cbiBcdFx0dmFyIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSA9IGZ1bmN0aW9uIHdhcm5VbmV4cGVjdGVkUmVxdWlyZSgpIHtcbiBcdFx0XHRjb25zb2xlLndhcm4oXG4gXHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArIHJlc3VsdC5tb2R1bGVJZCArIFwiKSB0byBkaXNwb3NlZCBtb2R1bGVcIlxuIFx0XHRcdCk7XG4gXHRcdH07XG5cbiBcdFx0Zm9yICh2YXIgaWQgaW4gaG90VXBkYXRlKSB7XG4gXHRcdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChob3RVcGRhdGUsIGlkKSkge1xuIFx0XHRcdFx0bW9kdWxlSWQgPSB0b01vZHVsZUlkKGlkKTtcbiBcdFx0XHRcdC8qKiBAdHlwZSB7VE9ET30gKi9cbiBcdFx0XHRcdHZhciByZXN1bHQ7XG4gXHRcdFx0XHRpZiAoaG90VXBkYXRlW2lkXSkge1xuIFx0XHRcdFx0XHRyZXN1bHQgPSBnZXRBZmZlY3RlZFN0dWZmKG1vZHVsZUlkKTtcbiBcdFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHRcdHJlc3VsdCA9IHtcbiBcdFx0XHRcdFx0XHR0eXBlOiBcImRpc3Bvc2VkXCIsXG4gXHRcdFx0XHRcdFx0bW9kdWxlSWQ6IGlkXG4gXHRcdFx0XHRcdH07XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHQvKiogQHR5cGUge0Vycm9yfGZhbHNlfSAqL1xuIFx0XHRcdFx0dmFyIGFib3J0RXJyb3IgPSBmYWxzZTtcbiBcdFx0XHRcdHZhciBkb0FwcGx5ID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgZG9EaXNwb3NlID0gZmFsc2U7XG4gXHRcdFx0XHR2YXIgY2hhaW5JbmZvID0gXCJcIjtcbiBcdFx0XHRcdGlmIChyZXN1bHQuY2hhaW4pIHtcbiBcdFx0XHRcdFx0Y2hhaW5JbmZvID0gXCJcXG5VcGRhdGUgcHJvcGFnYXRpb246IFwiICsgcmVzdWx0LmNoYWluLmpvaW4oXCIgLT4gXCIpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0c3dpdGNoIChyZXN1bHQudHlwZSkge1xuIFx0XHRcdFx0XHRjYXNlIFwic2VsZi1kZWNsaW5lZFwiOlxuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGVjbGluZWQpIG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcbiBcdFx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG4gXHRcdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIG9mIHNlbGYgZGVjbGluZTogXCIgK1xuIFx0XHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG4gXHRcdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiZGVjbGluZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG4gXHRcdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuIFx0XHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBkZWNsaW5lZCBkZXBlbmRlbmN5OiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm1vZHVsZUlkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRcIiBpbiBcIiArXG4gXHRcdFx0XHRcdFx0XHRcdFx0cmVzdWx0LnBhcmVudElkICtcbiBcdFx0XHRcdFx0XHRcdFx0XHRjaGFpbkluZm9cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0YnJlYWs7XG4gXHRcdFx0XHRcdGNhc2UgXCJ1bmFjY2VwdGVkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25VbmFjY2VwdGVkKSBvcHRpb25zLm9uVW5hY2NlcHRlZChyZXN1bHQpO1xuIFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVVbmFjY2VwdGVkKVxuIFx0XHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcbiBcdFx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2UgXCIgKyBtb2R1bGVJZCArIFwiIGlzIG5vdCBhY2NlcHRlZFwiICsgY2hhaW5JbmZvXG4gXHRcdFx0XHRcdFx0XHQpO1xuIFx0XHRcdFx0XHRcdGJyZWFrO1xuIFx0XHRcdFx0XHRjYXNlIFwiYWNjZXB0ZWRcIjpcbiBcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkFjY2VwdGVkKSBvcHRpb25zLm9uQWNjZXB0ZWQocmVzdWx0KTtcbiBcdFx0XHRcdFx0XHRkb0FwcGx5ID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0Y2FzZSBcImRpc3Bvc2VkXCI6XG4gXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EaXNwb3NlZCkgb3B0aW9ucy5vbkRpc3Bvc2VkKHJlc3VsdCk7XG4gXHRcdFx0XHRcdFx0ZG9EaXNwb3NlID0gdHJ1ZTtcbiBcdFx0XHRcdFx0XHRicmVhaztcbiBcdFx0XHRcdFx0ZGVmYXVsdDpcbiBcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJVbmV4Y2VwdGlvbiB0eXBlIFwiICsgcmVzdWx0LnR5cGUpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0aWYgKGFib3J0RXJyb3IpIHtcbiBcdFx0XHRcdFx0aG90U2V0U3RhdHVzKFwiYWJvcnRcIik7XG4gXHRcdFx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChhYm9ydEVycm9yKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHRcdGlmIChkb0FwcGx5KSB7XG4gXHRcdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gaG90VXBkYXRlW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCByZXN1bHQub3V0ZGF0ZWRNb2R1bGVzKTtcbiBcdFx0XHRcdFx0Zm9yIChtb2R1bGVJZCBpbiByZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRcdFx0XHRpZiAoXG4gXHRcdFx0XHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcyxcbiBcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWRcbiBcdFx0XHRcdFx0XHRcdClcbiBcdFx0XHRcdFx0XHQpIHtcbiBcdFx0XHRcdFx0XHRcdGlmICghb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKVxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0gPSBbXTtcbiBcdFx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KFxuIFx0XHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0sXG4gXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF1cbiBcdFx0XHRcdFx0XHRcdCk7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0XHRpZiAoZG9EaXNwb3NlKSB7XG4gXHRcdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgW3Jlc3VsdC5tb2R1bGVJZF0pO1xuIFx0XHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IHdhcm5VbmV4cGVjdGVkUmVxdWlyZTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBTdG9yZSBzZWxmIGFjY2VwdGVkIG91dGRhdGVkIG1vZHVsZXMgdG8gcmVxdWlyZSB0aGVtIGxhdGVyIGJ5IHRoZSBtb2R1bGUgc3lzdGVtXG4gXHRcdHZhciBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMgPSBbXTtcbiBcdFx0Zm9yIChpID0gMDsgaSA8IG91dGRhdGVkTW9kdWxlcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdG1vZHVsZUlkID0gb3V0ZGF0ZWRNb2R1bGVzW2ldO1xuIFx0XHRcdGlmIChcbiBcdFx0XHRcdGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdICYmXG4gXHRcdFx0XHRpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZFxuIFx0XHRcdClcbiBcdFx0XHRcdG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5wdXNoKHtcbiBcdFx0XHRcdFx0bW9kdWxlOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0ZXJyb3JIYW5kbGVyOiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5ob3QuX3NlbGZBY2NlcHRlZFxuIFx0XHRcdFx0fSk7XG4gXHRcdH1cblxuIFx0XHQvLyBOb3cgaW4gXCJkaXNwb3NlXCIgcGhhc2VcbiBcdFx0aG90U2V0U3RhdHVzKFwiZGlzcG9zZVwiKTtcbiBcdFx0T2JqZWN0LmtleXMoaG90QXZhaWxhYmxlRmlsZXNNYXApLmZvckVhY2goZnVuY3Rpb24oY2h1bmtJZCkge1xuIFx0XHRcdGlmIChob3RBdmFpbGFibGVGaWxlc01hcFtjaHVua0lkXSA9PT0gZmFsc2UpIHtcbiBcdFx0XHRcdGhvdERpc3Bvc2VDaHVuayhjaHVua0lkKTtcbiBcdFx0XHR9XG4gXHRcdH0pO1xuXG4gXHRcdHZhciBpZHg7XG4gXHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5zbGljZSgpO1xuIFx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuIFx0XHRcdG1vZHVsZUlkID0gcXVldWUucG9wKCk7XG4gXHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0aWYgKCFtb2R1bGUpIGNvbnRpbnVlO1xuXG4gXHRcdFx0dmFyIGRhdGEgPSB7fTtcblxuIFx0XHRcdC8vIENhbGwgZGlzcG9zZSBoYW5kbGVyc1xuIFx0XHRcdHZhciBkaXNwb3NlSGFuZGxlcnMgPSBtb2R1bGUuaG90Ll9kaXNwb3NlSGFuZGxlcnM7XG4gXHRcdFx0Zm9yIChqID0gMDsgaiA8IGRpc3Bvc2VIYW5kbGVycy5sZW5ndGg7IGorKykge1xuIFx0XHRcdFx0Y2IgPSBkaXNwb3NlSGFuZGxlcnNbal07XG4gXHRcdFx0XHRjYihkYXRhKTtcbiBcdFx0XHR9XG4gXHRcdFx0aG90Q3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdID0gZGF0YTtcblxuIFx0XHRcdC8vIGRpc2FibGUgbW9kdWxlICh0aGlzIGRpc2FibGVzIHJlcXVpcmVzIGZyb20gdGhpcyBtb2R1bGUpXG4gXHRcdFx0bW9kdWxlLmhvdC5hY3RpdmUgPSBmYWxzZTtcblxuIFx0XHRcdC8vIHJlbW92ZSBtb2R1bGUgZnJvbSBjYWNoZVxuIFx0XHRcdGRlbGV0ZSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcblxuIFx0XHRcdC8vIHdoZW4gZGlzcG9zaW5nIHRoZXJlIGlzIG5vIG5lZWQgdG8gY2FsbCBkaXNwb3NlIGhhbmRsZXJcbiBcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuXG4gXHRcdFx0Ly8gcmVtb3ZlIFwicGFyZW50c1wiIHJlZmVyZW5jZXMgZnJvbSBhbGwgY2hpbGRyZW5cbiBcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlLmNoaWxkcmVuLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHR2YXIgY2hpbGQgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZS5jaGlsZHJlbltqXV07XG4gXHRcdFx0XHRpZiAoIWNoaWxkKSBjb250aW51ZTtcbiBcdFx0XHRcdGlkeCA9IGNoaWxkLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCk7XG4gXHRcdFx0XHRpZiAoaWR4ID49IDApIHtcbiBcdFx0XHRcdFx0Y2hpbGQucGFyZW50cy5zcGxpY2UoaWR4LCAxKTtcbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyByZW1vdmUgb3V0ZGF0ZWQgZGVwZW5kZW5jeSBmcm9tIG1vZHVsZSBjaGlsZHJlblxuIFx0XHR2YXIgZGVwZW5kZW5jeTtcbiBcdFx0dmFyIG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzO1xuIFx0XHRmb3IgKG1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG4gXHRcdFx0aWYgKFxuIFx0XHRcdFx0T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZClcbiBcdFx0XHQpIHtcbiBcdFx0XHRcdG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0aWYgKG1vZHVsZSkge1xuIFx0XHRcdFx0XHRtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyA9IG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcbiBcdFx0XHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaisrKSB7XG4gXHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2pdO1xuIFx0XHRcdFx0XHRcdGlkeCA9IG1vZHVsZS5jaGlsZHJlbi5pbmRleE9mKGRlcGVuZGVuY3kpO1xuIFx0XHRcdFx0XHRcdGlmIChpZHggPj0gMCkgbW9kdWxlLmNoaWxkcmVuLnNwbGljZShpZHgsIDEpO1xuIFx0XHRcdFx0XHR9XG4gXHRcdFx0XHR9XG4gXHRcdFx0fVxuIFx0XHR9XG5cbiBcdFx0Ly8gTm90IGluIFwiYXBwbHlcIiBwaGFzZVxuIFx0XHRob3RTZXRTdGF0dXMoXCJhcHBseVwiKTtcblxuIFx0XHRob3RDdXJyZW50SGFzaCA9IGhvdFVwZGF0ZU5ld0hhc2g7XG5cbiBcdFx0Ly8gaW5zZXJ0IG5ldyBjb2RlXG4gXHRcdGZvciAobW9kdWxlSWQgaW4gYXBwbGllZFVwZGF0ZSkge1xuIFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYXBwbGllZFVwZGF0ZSwgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdO1xuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGNhbGwgYWNjZXB0IGhhbmRsZXJzXG4gXHRcdHZhciBlcnJvciA9IG51bGw7XG4gXHRcdGZvciAobW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcbiBcdFx0XHRpZiAoXG4gXHRcdFx0XHRPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG1vZHVsZUlkKVxuIFx0XHRcdCkge1xuIFx0XHRcdFx0bW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdFx0XHRpZiAobW9kdWxlKSB7XG4gXHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID0gb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdO1xuIFx0XHRcdFx0XHR2YXIgY2FsbGJhY2tzID0gW107XG4gXHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGkrKykge1xuIFx0XHRcdFx0XHRcdGRlcGVuZGVuY3kgPSBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llc1tpXTtcbiBcdFx0XHRcdFx0XHRjYiA9IG1vZHVsZS5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcGVuZGVuY3ldO1xuIFx0XHRcdFx0XHRcdGlmIChjYikge1xuIFx0XHRcdFx0XHRcdFx0aWYgKGNhbGxiYWNrcy5pbmRleE9mKGNiKSAhPT0gLTEpIGNvbnRpbnVlO1xuIFx0XHRcdFx0XHRcdFx0Y2FsbGJhY2tzLnB1c2goY2IpO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRmb3IgKGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0XHRcdFx0Y2IgPSBjYWxsYmFja3NbaV07XG4gXHRcdFx0XHRcdFx0dHJ5IHtcbiBcdFx0XHRcdFx0XHRcdGNiKG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzKTtcbiBcdFx0XHRcdFx0XHR9IGNhdGNoIChlcnIpIHtcbiBcdFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG4gXHRcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJhY2NlcHQtZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcbiBcdFx0XHRcdFx0XHRcdFx0XHRkZXBlbmRlbmN5SWQ6IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2ldLFxuIFx0XHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHR9XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdH1cbiBcdFx0XHR9XG4gXHRcdH1cblxuIFx0XHQvLyBMb2FkIHNlbGYgYWNjZXB0ZWQgbW9kdWxlc1xuIFx0XHRmb3IgKGkgPSAwOyBpIDwgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0dmFyIGl0ZW0gPSBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXNbaV07XG4gXHRcdFx0bW9kdWxlSWQgPSBpdGVtLm1vZHVsZTtcbiBcdFx0XHRob3RDdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG4gXHRcdFx0dHJ5IHtcbiBcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpO1xuIFx0XHRcdH0gY2F0Y2ggKGVycikge1xuIFx0XHRcdFx0aWYgKHR5cGVvZiBpdGVtLmVycm9ySGFuZGxlciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gXHRcdFx0XHRcdHRyeSB7XG4gXHRcdFx0XHRcdFx0aXRlbS5lcnJvckhhbmRsZXIoZXJyKTtcbiBcdFx0XHRcdFx0fSBjYXRjaCAoZXJyMikge1xuIFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yLWhhbmRsZXItZXJyb3JlZFwiLFxuIFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnIyLFxuIFx0XHRcdFx0XHRcdFx0XHRvcmlnaW5hbEVycm9yOiBlcnJcbiBcdFx0XHRcdFx0XHRcdH0pO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuIFx0XHRcdFx0XHRcdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnIyO1xuIFx0XHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fSBlbHNlIHtcbiBcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG4gXHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuIFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvcmVkXCIsXG4gXHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG4gXHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXG4gXHRcdFx0XHRcdFx0fSk7XG4gXHRcdFx0XHRcdH1cbiBcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcbiBcdFx0XHRcdFx0XHRpZiAoIWVycm9yKSBlcnJvciA9IGVycjtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fVxuIFx0XHRcdH1cbiBcdFx0fVxuXG4gXHRcdC8vIGhhbmRsZSBlcnJvcnMgaW4gYWNjZXB0IGhhbmRsZXJzIGFuZCBzZWxmIGFjY2VwdGVkIG1vZHVsZSBsb2FkXG4gXHRcdGlmIChlcnJvcikge1xuIFx0XHRcdGhvdFNldFN0YXR1cyhcImZhaWxcIik7XG4gXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiBcdFx0fVxuXG4gXHRcdGhvdFNldFN0YXR1cyhcImlkbGVcIik7XG4gXHRcdHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlKSB7XG4gXHRcdFx0cmVzb2x2ZShvdXRkYXRlZE1vZHVsZXMpO1xuIFx0XHR9KTtcbiBcdH1cblxuIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aG90OiBob3RDcmVhdGVNb2R1bGUobW9kdWxlSWQpLFxuIFx0XHRcdHBhcmVudHM6IChob3RDdXJyZW50UGFyZW50c1RlbXAgPSBob3RDdXJyZW50UGFyZW50cywgaG90Q3VycmVudFBhcmVudHMgPSBbXSwgaG90Q3VycmVudFBhcmVudHNUZW1wKSxcbiBcdFx0XHRjaGlsZHJlbjogW11cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgaG90Q3JlYXRlUmVxdWlyZShtb2R1bGVJZCkpO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIF9fd2VicGFja19oYXNoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18uaCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gaG90Q3VycmVudEhhc2g7IH07XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gaG90Q3JlYXRlUmVxdWlyZSgwKShfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcbiIsIlxyXG5pbXBvcnQgJy4vc3R5bGUuc2Nzcyc7XHJcblxyXG5pbXBvcnQgeyBIZWFkZXIgfSBmcm9tICcuL2NvbXBvbmVudHMvaGVhZGVyL2luZGV4JztcclxuXHJcbmltcG9ydCB7IE1haW4gfSBmcm9tICcuL2NvbXBvbmVudHMvc2VjdGlvbi1tYWluL2luZGV4JztcclxuXHJcbmltcG9ydCB7IEFib3V0IH0gZnJvbSAnLi9jb21wb25lbnRzL3NlY3Rpb24tYWJvdXQvaW5kZXgnO1xyXG5cclxuaW1wb3J0IHsgU3BlYWtlcnMgfSBmcm9tICcuL2NvbXBvbmVudHMvc2VjdGlvbi1zcGVha2Vycy9pbmRleCc7XHJcblxyXG5pbXBvcnQgeyBQaG90b3MgfSBmcm9tICcuL2NvbXBvbmVudHMvc2VjdGlvbi1waG90b3MvaW5kZXgnO1xyXG5cclxuaW1wb3J0IHsgRmFxIH0gZnJvbSAnLi9jb21wb25lbnRzL3NlY3Rpb24tRkFRL2luZGV4JztcclxuXHJcbmltcG9ydCB7IFBhcnRuZXJzIH0gZnJvbSAnLi9jb21wb25lbnRzL3NlY3Rpb24tcGFydG5lcnMvaW5kZXgnO1xyXG5cclxuaW1wb3J0IHsgRGVzdGluYXRpb24gfSBmcm9tICcuL2NvbXBvbmVudHMvc2VjdGlvbi1kZXN0aW5hdGlvbi9pbmRleCc7XHJcblxyXG5cclxuXHJcbmNvbnN0IGRvYyA9IGRvY3VtZW50O1xyXG5jb25zdCBtYWluV3JhcHBlciA9IGRvYy5nZXRFbGVtZW50QnlJZCgnbWFpbicpO1xyXG5jb25zdCBzZWN0aW9uc1dyYXBwZXIgPSBkb2MuZ2V0RWxlbWVudEJ5SWQoJ3NlY3Rpb25zJyk7XHJcblxyXG5cclxubGV0IG1haW4gPSBbSGVhZGVyLCBNYWluXTtcclxubGV0IHNlY3Rpb25zID0gW0Fib3V0LCBEZXN0aW5hdGlvbiwgU3BlYWtlcnMsIFBob3RvcywgRmFxLCBQYXJ0bmVyc107XHJcblxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgc2VjdGlvbnMuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICBzZWN0aW9uc1dyYXBwZXIuaW5uZXJIVE1MICs9IGl0ZW0uaHRtbDtcclxuICAgIH0pO1xyXG5cclxuICAgIG1haW4uZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICBtYWluV3JhcHBlci5pbm5lckhUTUwgKz0gaXRlbS5odG1sO1xyXG4gICAgfSk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuICAgICQoXCIjbWVudVRvZ2dsZVwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIGxldCBsaW5lcyA9IGRvYy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwibmF2LXRvZ2dsZV9fYnVyZ2VyTGluZVwiKTtcclxuXHJcbiAgICAgICAgJChsaW5lc1syXSkudG9nZ2xlQ2xhc3MoXCJuYXYtdG9nZ2xlX19idXJnZXJMaW5lLS1oaWRlXCIpO1xyXG4gICAgICAgICQobGluZXNbMF0pLnRvZ2dsZUNsYXNzKFwibmF2LXRvZ2dsZV9fYnVyZ2VyTGluZS0tcm90YXRlNDVkXCIpO1xyXG4gICAgICAgICQobGluZXNbMV0pLnRvZ2dsZUNsYXNzKFwibmF2LXRvZ2dsZV9fYnVyZ2VyTGluZS0tcm90YXRlLTQ1ZFwiKTtcclxuXHJcbiAgICAgICAgJCgnI21lbnUnKS50b2dnbGVDbGFzcyhcImhlYWRlcl9fbmF2LS1zaG93XCIpO1xyXG5cclxuICAgIH0pXHJcblxyXG59KVxyXG5cclxuXHJcbmlmIChtb2R1bGUuaG90KSB7XHJcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgpXHJcbn1cclxuXHJcbiIsIm1vZHVsZS5leHBvcnRzID0gXCI8aGVhZGVyIGNsYXNzPSdoZWFkZXInPlxcclxcblxcclxcbiAgICA8ZGl2IGNsYXNzPSdoZWFkZXItZ3JpZCc+XFxyXFxuXFxyXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJoZWFkZXJfX2xvZ28gbG9nb1xcXCI+XFxyXFxuXFxyXFxuICAgICAgICAgICAgPGEgaHJlZj1cXFwiL1xcXCIgY2xhc3M9XFxcImxvZ29fX2xpbmtcXFwiPlxcclxcbiAgICAgICAgICAgICAgICA8aW1nIHNyYz1cXFwiXCIgKyByZXF1aXJlKFwiLi9pbWcvaW1hZ3VydS1sb2dvLnBuZ1wiKSArIFwiXFxcIiBhbHQ9XFxcIlxcXCIgY2xhc3M9J2xvZ29fX3BpY3R1cmUnPlxcclxcblxcclxcbiAgICAgICAgICAgIDwvYT5cXHJcXG5cXHJcXG4gICAgICAgICAgICA8YSBocmVmPVxcXCIvXFxcIiBjbGFzcz1cXFwibG9nb19fbGlua1xcXCI+XFxyXFxuICAgICAgICAgICAgICAgIDxpbWcgc3JjPVxcXCJcIiArIHJlcXVpcmUoXCIuL2ltZy9MSUFBLWxvZ28xLnBuZ1wiKSArIFwiXFxcIiBhbHQ9XFxcIlxcXCIgY2xhc3M9J2xvZ29fX3BpY3R1cmUnPlxcclxcbiAgICAgICAgICAgIDwvYT5cXHJcXG4gICAgICAgIDwvZGl2PlxcclxcblxcclxcbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cXFwiaGVhZGVyX19uYXZCdXR0b24gbmF2LXRvZ2dsZSBuYXYtdG9nZ2xlLS13aWR0aCBcXFwiIGlkPSdtZW51VG9nZ2xlJz5cXHJcXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJuYXYtdG9nZ2xlLWdyaWQgbmF2LXRvZ2dsZS0td2lkdGhcXFwiPlxcclxcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwibmF2LXRvZ2dsZV9fYnVyZ2VyTGluZSBuYXYtdG9nZ2xlLS13aWR0aFxcXCI+PC9zcGFuPlxcclxcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwibmF2LXRvZ2dsZV9fYnVyZ2VyTGluZSBuYXYtdG9nZ2xlLS13aWR0aFxcXCI+PC9zcGFuPlxcclxcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwibmF2LXRvZ2dsZV9fYnVyZ2VyTGluZSBuYXYtdG9nZ2xlLS13aWR0aFxcXCI+PC9zcGFuPlxcclxcbiAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPC9idXR0b24+XFxyXFxuXFxyXFxuICAgICAgICA8bmF2IGNsYXNzPVxcXCIgaGVhZGVyX19uYXZcXFwiIGlkPSdtZW51Jz5cXHJcXG4gICAgICAgICAgICA8dWwgY2xhc3M9XFxcIm5hdi1ncmlkXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPGxpPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cXFwiI2Fib3V0XFxcIj5BYm91dDwvYT5cXHJcXG4gICAgICAgICAgICAgICAgPC9saT5cXHJcXG4gICAgICAgICAgICAgICAgPGxpPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cXFwiI2Rlc3RpbmF0aW9uXFxcIj5EZXN0aW5hdGlvbjwvYT5cXHJcXG4gICAgICAgICAgICAgICAgPC9saT5cXHJcXG4gICAgICAgICAgICAgICAgPGxpPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cXFwiI3NwZWFrZXJzXFxcIj5TcGVha2VyczwvYT5cXHJcXG4gICAgICAgICAgICAgICAgPC9saT5cXHJcXG4gICAgICAgICAgICAgICAgPGxpPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cXFwiI3Bob3Rvc1xcXCI+UGhvdG9zPC9hPlxcclxcbiAgICAgICAgICAgICAgICA8L2xpPlxcclxcbiAgICAgICAgICAgICAgICA8bGk+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVxcXCIjZmFxXFxcIj5GQVE8L2E+XFxyXFxuICAgICAgICAgICAgICAgIDwvbGk+XFxyXFxuICAgICAgICAgICAgICAgIDxsaT5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XFxcIiNwYXJ0bmVyc1xcXCI+UGFydG5lcnM8L2E+XFxyXFxuICAgICAgICAgICAgICAgIDwvbGk+XFxyXFxuICAgICAgICAgICAgPC91bD5cXHJcXG4gICAgICAgIDwvbmF2PlxcclxcblxcclxcbiAgICA8L2Rpdj5cXHJcXG5cXHJcXG5cXHJcXG48L2hlYWRlcj5cIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJpbWcvTElBQS1sb2dvMS5wbmdcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJpbWcvaW1hZ3VydS1sb2dvLnBuZ1wiOyIsIi8vaW1wb3J0ICcuL2hlYWRlci5zY3NzJztcclxuXHJcbmltcG9ydCB0eHQgZnJvbSAnLi9oZWFkZXIuaHRtbCc7XHJcblxyXG5jb25zdCBIZWFkZXIgPSB7fTtcclxuXHJcbi8vaW1wb3J0IEZvb3RlciBmcm9tICcuL2NvbXAnO1xyXG5cclxuSGVhZGVyLmh0bWwgPSB0eHQ7XHJcblxyXG5leHBvcnQgeyBIZWFkZXIgfSIsIm1vZHVsZS5leHBvcnRzID0gXCI8c2VjdGlvbiBjbGFzcz1cXFwic2VjdGlvbi1mYXFcXFwiPlxcclxcbiAgICA8aDIgaWQ9J2ZhcSc+RkFRPC9oMj5cXHJcXG5cXHJcXG5cXHJcXG4gICAgPGRpdiBjbGFzcz1cXFwiICBxdWVzdGlvblxcXCI+XFxyXFxuXFxyXFxuICAgICAgICA8aDMgY2xhc3M9XFxcInF1ZXN0aW9uX190aXRsZVxcXCI+XFxyXFxuICAgICAgICAgICAgSG93IGRvIEkgZ2V0IG15IHRyYWluIHRpY2tldD9cXHJcXG4gICAgICAgIDwvaDM+XFxyXFxuXFxyXFxuICAgICAgICA8cCBjbGFzcz1cXFwicXVlc3Rpb25fX2Fuc3dlclxcXCI+XFxyXFxuICAgICAgICAgICAgVGhlIGNoZWNrLWluIGZvciBwYXJ0aWNpcGFudHMgd2lsbCBiZSBvcmdhbml6ZWQgYXQgUmVzdGF1cmFudCAxZSBLbGFzLCBsb2NhdGVkIGF0IHBsYXRmb3JtIDJCLCBBbXN0ZXJkYW0gQ2VudHJhbCBTdGF0aW9uLlxcclxcbiAgICAgICAgPC9wPlxcclxcbiAgICA8L2Rpdj5cXHJcXG5cXHJcXG4gICAgPGRpdiBjbGFzcz1cXFwiICBxdWVzdGlvblxcXCI+XFxyXFxuXFxyXFxuICAgICAgICA8aDMgY2xhc3M9XFxcInF1ZXN0aW9uX190aXRsZVxcXCI+XFxyXFxuICAgICAgICAgICAgRnJvbSB3aGVyZSBpcyB0aGUgSGFja2F0cmFpbiBkZXBhcnRpbmc/XFxyXFxuICAgICAgICA8L2gzPlxcclxcblxcclxcbiAgICAgICAgPHAgY2xhc3M9XFxcInF1ZXN0aW9uX19hbnN3ZXJcXFwiPlxcclxcbiAgICAgICAgICAgIFRoZSBjaGVjay1pbiBmb3IgcGFydGljaXBhbnRzIHdpbGwgYmUgb3JnYW5pemVkIGF0IFJlc3RhdXJhbnQgMWUgS2xhcywgbG9jYXRlZCBhdCBwbGF0Zm9ybSAyQiwgQW1zdGVyZGFtIENlbnRyYWwgU3RhdGlvbi5cXHJcXG4gICAgICAgIDwvcD5cXHJcXG4gICAgPC9kaXY+XFxyXFxuXFxyXFxuICAgIDxkaXYgY2xhc3M9XFxcIiAgcXVlc3Rpb25cXFwiPlxcclxcblxcclxcbiAgICAgICAgPGgzIGNsYXNzPVxcXCJxdWVzdGlvbl9fdGl0bGVcXFwiPlxcclxcbiAgICAgICAgICAgIFdoYXQgdGltZSBpcyB0aGUgSGFja2F0cmFpbiBkZXBhcnRpbmc/XFxyXFxuICAgICAgICA8L2gzPlxcclxcblxcclxcbiAgICAgICAgPHAgY2xhc3M9XFxcInF1ZXN0aW9uX19hbnN3ZXJcXFwiPlxcclxcbiAgICAgICAgICAgIFRoZSBjaGVjay1pbiBmb3IgcGFydGljaXBhbnRzIHdpbGwgYmUgb3JnYW5pemVkIGF0IFJlc3RhdXJhbnQgMWUgS2xhcywgbG9jYXRlZCBhdCBwbGF0Zm9ybSAyQiwgQW1zdGVyZGFtIENlbnRyYWwgU3RhdGlvbi5cXHJcXG4gICAgICAgIDwvcD5cXHJcXG4gICAgPC9kaXY+XFxyXFxuXFxyXFxuICAgIDxkaXYgY2xhc3M9XFxcIiAgcXVlc3Rpb25cXFwiPlxcclxcblxcclxcbiAgICAgICAgPGgzIGNsYXNzPVxcXCJxdWVzdGlvbl9fdGl0bGVcXFwiPlxcclxcbiAgICAgICAgICAgIFdoYXQgYWJvdXQgdGhlIHJldHVybiB0cmlwP1xcclxcbiAgICAgICAgPC9oMz5cXHJcXG5cXHJcXG4gICAgICAgIDxwIGNsYXNzPVxcXCJxdWVzdGlvbl9fYW5zd2VyXFxcIj5cXHJcXG4gICAgICAgICAgICBUaGUgY2hlY2staW4gZm9yIHBhcnRpY2lwYW50cyB3aWxsIGJlIG9yZ2FuaXplZCBhdCBSZXN0YXVyYW50IDFlIEtsYXMsIGxvY2F0ZWQgYXQgcGxhdGZvcm0gMkIsIEFtc3RlcmRhbSBDZW50cmFsIFN0YXRpb24uXFxyXFxuICAgICAgICA8L3A+XFxyXFxuICAgIDwvZGl2Plxcclxcblxcclxcblxcclxcblxcclxcblxcclxcbjwvc2VjdGlvbj5cIjsiLCIvL2ltcG9ydCAnLi9mYXEuc2Nzcyc7XHJcblxyXG5pbXBvcnQgdHh0IGZyb20gJy4vZmFxLmh0bWwnO1xyXG5cclxuY29uc3QgRmFxID0ge307XHJcblxyXG4vL2ltcG9ydCBGb290ZXIgZnJvbSAnLi9jb21wJztcclxuXHJcbkZhcS5odG1sID0gdHh0O1xyXG5cclxuZXhwb3J0IHsgRmFxIH0iLCJtb2R1bGUuZXhwb3J0cyA9IFwiPHNlY3Rpb24gY2xhc3M9XFxcInNlY3Rpb24tYWJvdXRcXFwiPlxcclxcblxcclxcbiAgICA8aDIgaWQ9J2Fib3V0Jz5BYm91dDwvaDI+XFxyXFxuXFxyXFxuXFxyXFxuICAgIDxwPlxcclxcbiAgICAgICAgPGI+Rm9yIHRoZSBmaXJzdCB0aW1lIGluIEJlbGFydXMhPC9iPlxcclxcbiAgICA8L3A+XFxyXFxuICAgIDxwPiBTdGFydGluZyBhdCBJbWFndXJ1IG9uIEF1Z3VzdCAzMHRoLCBjb250aW51aW5nIG9uIGEgdHJhaW4gaW4gUmlnYSwgZmluaXNoaW5nIGFmdGVyIG91ciBhcnJpdmFsIGluIFJpZ2EgYW5kIGVuZGluZyBhdFxcclxcbiAgICAgICAgLy8vLiBUaGUgbm93IGxlZ2VuZGFyeSBIYWNrYXRyYWluIGF0dHJhY3RzIGRldmVsb3BlcnMsIGRlc2lnbmVycyBhbmQgZW50cmVwcmVuZXVycyBmcm9tIGFsbCBvdmVyIHRoZSB3b3JsZCwgYWxsIGhvcGluZ1xcclxcbiAgICAgICAgdG8gc3RyaWtlIGl0IGJpZywgaGFja2F0aG9uLXN0eWxlLiBUaGlzIGlzbuKAmXQgeW91ciB0eXBpY2FsIGhhY2thdGhvbi4gU2F5IGdvb2RieWUgdG8gYm9yaW5nIHZlbnVlcyBhbmQgaGVsbG8gdG8gdHJhdmVsbGluZ1xcclxcbiAgICAgICAgYXJvdW5kIHdpdGggbW9yZSB0aGFuIDUwIGZlbGxvdyBoYWNrZXJzIGNvbXBldGluZyBhY3Jvc3MgbW9iaWxpdHkgY2hhbGxlbmdlcy5cXHJcXG5cXHJcXG4gICAgPC9wPlxcclxcblxcclxcbiAgICA8cD5cXHJcXG4gICAgICAgIDxiPkFyZSB5b3UgcmVhZHkgZm9yIEhhY2thdGhvbiBvbiBUcmFpbiBNaW5zay1SaWdhPzwvYj5cXHJcXG4gICAgPC9wPlxcclxcblxcclxcblxcclxcbjwvc2VjdGlvbj5cIjsiLCIvL2ltcG9ydCAnLi9hYm91dC5zY3NzJztcclxuXHJcbmltcG9ydCB0eHQgZnJvbSAnLi9hYm91dC5odG1sJztcclxuXHJcbmNvbnN0IEFib3V0ID0ge307XHJcblxyXG4vL2ltcG9ydCBGb290ZXIgZnJvbSAnLi9jb21wJztcclxuXHJcbkFib3V0Lmh0bWwgPSB0eHQ7XHJcblxyXG5leHBvcnQgeyBBYm91dCB9IiwibW9kdWxlLmV4cG9ydHMgPSBcIjxzZWN0aW9uIGNsYXNzPVxcXCJzZWN0aW9uLWRlc3RpbmF0aW9uXFxcIj5cXHJcXG5cXHJcXG4gICAgPGgyIGlkPSdkZXN0aW5hdGlvbic+RGVzdGluYXRpb248L2gyPlxcclxcblxcclxcblxcclxcblxcclxcbiAgICA8aW1nIHNyYz1cXFwiXCIgKyByZXF1aXJlKFwiLi9pbWcvTWFwLmdpZlwiKSArIFwiXFxcIiBhbHQ9XFxcIlxcXCIgY2xhc3M9XFxcIm1hcFxcXCI+XFxyXFxuXFxyXFxuXFxyXFxuICAgIDxkaXYgY2xhc3M9XFxcImFnZW5kYS1ncmlkXFxcIj5cXHJcXG5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcImFnZW5kYVxcXCI+XFxyXFxuICAgICAgICAgICAgPGgzIGNsYXNzPVxcXCJhZ2VuZGFfX2RhdGVcXFwiPiBBdWcgMzAgPC9oMz5cXHJcXG5cXHJcXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJhZ2VuZGFfX3NjaGVkdWxlXFxcIj5cXHJcXG5cXHJcXG4gICAgICAgICAgICAgICAgPHA+IDE3OjAwIC0gMTc6MzAgUmVnaXN0cmF0aW9uPC9wPlxcclxcbiAgICAgICAgICAgICAgICA8cD4xODowMCAtIDE4OjMwIE9wZW5pbmcgQ2VyZW1vbnk8L3A+XFxyXFxuICAgICAgICAgICAgICAgIDxwPjE4OjMwIC0gMjA6MDAgUGl0Y2hpbmcgaW4gTWluc2sgLyBIYWNrYXRob24gU3RhcnRzPC9wPlxcclxcbiAgICAgICAgICAgIDwvZGl2PlxcclxcblxcclxcbiAgICAgICAgPC9kaXY+XFxyXFxuXFxyXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJhZ2VuZGFcXFwiPlxcclxcbiAgICAgICAgICAgIDxoMyBjbGFzcz1cXFwiYWdlbmRhX19kYXRlXFxcIj4gQXVnIDMxIDwvaDM+XFxyXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiYWdlbmRhX19zY2hlZHVsZVxcXCI+XFxyXFxuICAgICAgICAgICAgICAgIDxwPjA5OjAwIC0gMTE6MDAgQnJlYWtmYXN0IC8gQ2hlY2stcG9pbnQ8L3A+XFxyXFxuICAgICAgICAgICAgICAgIDxwPiAxMTowMCBNZW50b3JpbmcgU2Vzc2lvbjwvcD5cXHJcXG4gICAgICAgICAgICAgICAgPHA+MTM6MDAgLSAxNDowMCBMdW5jaDwvcD5cXHJcXG4gICAgICAgICAgICAgICAgPHA+IDE0OjAwIE1lbnRvcmluZyBTZXNzaW9uPC9wPlxcclxcbiAgICAgICAgICAgICAgICA8cD4xODowMCAtIERpbm5lciAvIERlcGFydHVyZSBmb3IgdHJhaW48L3A+XFxyXFxuICAgICAgICAgICAgICAgIDxwPiAyMDoxNSAtIFRyYWluIGRlcGFydHVyZXM8L3A+XFxyXFxuICAgICAgICAgICAgICAgIDxwPjIwOjE1IC0g4oCmIEhhY2tpbmc8L3A+XFxyXFxuXFxyXFxuICAgICAgICAgICAgPC9kaXY+XFxyXFxuXFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcImFnZW5kYVxcXCI+XFxyXFxuXFxyXFxuICAgICAgICAgICAgPGgzIGNsYXNzPVxcXCJhZ2VuZGFfX2RhdGVcXFwiPiBTZXB0IDEgPC9oMz5cXHJcXG5cXHJcXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJhZ2VuZGFfX3NjaGVkdWxlXFxcIj5cXHJcXG5cXHJcXG4gICAgICAgICAgICAgICAgPHA+IDA4OjAwIC0gVHJhaW4gQXJyaXZlcyB0byBSaWdhPC9wPlxcclxcbiAgICAgICAgICAgICAgICA8cD4gMDk6MDAgLSAxMTowMCBCcmVha2Zhc3QgLyBDaGVjay1wb2ludDwvcD5cXHJcXG4gICAgICAgICAgICAgICAgPHA+IDExOjAwIE1lbnRvcmluZyBTZXNzaW9uPC9wPlxcclxcbiAgICAgICAgICAgICAgICA8cD4gMTM6MDAgLSAxNDowMCBMdW5jaDwvcD5cXHJcXG4gICAgICAgICAgICAgICAgPHA+IDE0OjAwIC0gMTg6MDAgRmluYWwgUHJlcGFyYXRpb248L3A+XFxyXFxuICAgICAgICAgICAgICAgIDxwPiAxODowMCAtIDE5OjMwIEZpbmFsIFN0YWdlPC9wPlxcclxcbiAgICAgICAgICAgICAgICA8cD4gMTk6MzAgLSAyMTowMCBBd2FyZCBDZXJlbW9ueS4gUGFydHk8L3A+XFxyXFxuXFxyXFxuXFxyXFxuXFxyXFxuICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG5cXHJcXG4gICAgPC9kaXY+XFxyXFxuXFxyXFxuXFxyXFxuPC9zZWN0aW9uPlwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImltZy9NYXAuZ2lmXCI7IiwiLy9pbXBvcnQgJy4vZGVzdGluYXRpb24uc2Nzcyc7XHJcblxyXG5pbXBvcnQgdHh0IGZyb20gJy4vZGVzdGluYXRpb24uaHRtbCc7XHJcblxyXG5jb25zdCBEZXN0aW5hdGlvbiA9IHt9O1xyXG5cclxuRGVzdGluYXRpb24uaHRtbCA9IHR4dDtcclxuXHJcbmV4cG9ydCB7IERlc3RpbmF0aW9uIH0iLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJpbWcvdHJhaW4uZ2lmXCI7IiwiLy9pbXBvcnQgJy4vbWFpbi5zY3NzJztcclxuXHJcbmltcG9ydCB0eHQgZnJvbSAnLi9tYWluLmh0bWwnO1xyXG5cclxuY29uc3QgTWFpbiA9IHt9O1xyXG5cclxuLy9pbXBvcnQgRm9vdGVyIGZyb20gJy4vY29tcCc7XHJcblxyXG5NYWluLmh0bWwgPSB0eHQ7XHJcblxyXG5leHBvcnQgeyBNYWluIH0iLCJtb2R1bGUuZXhwb3J0cyA9IFwiPHNlY3Rpb24gY2xhc3M9J3NlY3Rpb24tbWFpbic+XFxyXFxuXFxyXFxuICAgIDxoMSBjbGFzcz0nc2VjdGlvbi1tYWluX190aXRsZSc+SW1hZ3VydSBIYWNrYXRob24gb24gVHJhaW5cXHJcXG5cXHJcXG4gICAgICAgIDwhLS0gLi4uIC0tPlxcclxcbiAgICAgICAgTWluc2sgLSBSaWdhXFxyXFxuICAgIDwvaDE+XFxyXFxuXFxyXFxuICAgIDxpbWcgc3JjPVxcXCJcIiArIHJlcXVpcmUoXCIuL2ltZy90cmFpbi5naWZcIikgKyBcIlxcXCIgYWx0PVxcXCJrb2tvXFxcIiBjbGFzcz0nc2VjdGlvbi1tYWluX190cmFpbkltZyc+XFxyXFxuICAgIDxoMyBjbGFzcz0nc2VjdGlvbi1tYWluX19kYXRlJz5BdWd1c3QgMzAgLSBTZXB0ZW1iZXIgMSwgMjAxODwvaDM+XFxyXFxuXFxyXFxuICAgIDxidXR0b24gY2xhc3M9J3NlY3Rpb24tbWFpbl9fcmVnaXN0ZXJCdG4nPlxcclxcbiAgICAgICAgPGEgaHJlZj1cXFwiXFxcIj5cXHJcXG4gICAgICAgICAgICBSZWdpc3RlclxcclxcbiAgICAgICAgPC9hPlxcclxcbiAgICA8L2J1dHRvbj5cXHJcXG5cXHJcXG5cXHJcXG48L3NlY3Rpb24+XCI7IiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiaW1nL2xvZ28tYXBhbG9uLnBuZ1wiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImltZy9sb2dvLWVtZXJsaW5lLnBuZ1wiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImltZy9sb2dvLWVwYW0ucG5nXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiaW1nL2xvZ28tZXZvbHV0aW9uLWdhbWluZy5wbmdcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJpbWcvbG9nby1ocXNvZnR3YXJlLnBuZ1wiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImltZy9sb2dvLW5pa29maXJtLnBuZ1wiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImltZy9sb2dvLW94YWdpbGUucG5nXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiaW1nL2xvZ28tcnMucG5nXCI7IiwiLy9pbXBvcnQgJy4vcGFydG5lcnMuc2Nzcyc7XHJcblxyXG5pbXBvcnQgdHh0IGZyb20gJy4vcGFydG5lcnMuaHRtbCc7XHJcblxyXG5jb25zdCBQYXJ0bmVycyA9IHt9O1xyXG5cclxuLy9pbXBvcnQgRm9vdGVyIGZyb20gJy4vY29tcCc7XHJcblxyXG5QYXJ0bmVycy5odG1sID0gdHh0O1xyXG5cclxuZXhwb3J0IHsgUGFydG5lcnMgfSIsIm1vZHVsZS5leHBvcnRzID0gXCI8c2VjdGlvbiBjbGFzcz1cXFwic2VjdGlvbi1wYXJ0bmVyc1xcXCI+XFxyXFxuICAgIDxoMiBpZD0ncGFydG5lcnMnPk91ciBwYXJ0bmVyczwvaDI+XFxyXFxuXFxyXFxuICAgIDxkaXYgY2xhc3M9XFxcImRpYW1vbmQgcGFydG5lcnNcXFwiPlxcclxcblxcclxcbiAgICAgICAgPGg0IGNsYXNzPVxcXCJwYXJ0bmVyc19fdGl0bGVcXFwiPkRpYW1vbmQ8L2g0PlxcclxcblxcclxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwicGFydG5lcnNfX2xvZ29zXFxcIj5cXHJcXG5cXHJcXG4gICAgICAgICAgICA8aW1nIHNyYz1cXFwiXCIgKyByZXF1aXJlKFwiLi9pbWcvbG9nby1lcGFtLnBuZ1wiKSArIFwiXFxcIiBhbHQ9XFxcIlxcXCI+XFxyXFxuICAgICAgICAgICAgPGltZyBzcmM9XFxcIlwiICsgcmVxdWlyZShcIi4vaW1nL2xvZ28tcnMucG5nXCIpICsgXCJcXFwiIGFsdD1cXFwiXFxcIj5cXHJcXG4gICAgICAgIDwvZGl2PlxcclxcblxcclxcblxcclxcbiAgICA8L2Rpdj5cXHJcXG5cXHJcXG4gICAgPGRpdiBjbGFzcz1cXFwiZ29sZCBwYXJ0bmVyc1xcXCI+XFxyXFxuICAgICAgICA8aDQgY2xhc3M9XFxcInBhcnRuZXJzX190aXRsZVxcXCI+R29sZDwvaDQ+XFxyXFxuXFxyXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJwYXJ0bmVyc19fbG9nb3NcXFwiPlxcclxcbiAgICAgICAgICAgIDxpbWcgc3JjPVxcXCJcIiArIHJlcXVpcmUoXCIuL2ltZy9sb2dvLWVtZXJsaW5lLnBuZ1wiKSArIFwiXFxcIiBhbHQ9XFxcIlxcXCI+XFxyXFxuICAgICAgICAgICAgPGltZyBzcmM9XFxcIlwiICsgcmVxdWlyZShcIi4vaW1nL2xvZ28tZXZvbHV0aW9uLWdhbWluZy5wbmdcIikgKyBcIlxcXCIgYWx0PVxcXCJcXFwiPlxcclxcbiAgICAgICAgPC9kaXY+XFxyXFxuICAgIDwvZGl2PlxcclxcblxcclxcbiAgICA8ZGl2IGNsYXNzPVxcXCJzaWx2ZXIgcGFydG5lcnNcXFwiPlxcclxcbiAgICAgICAgPGg0IGNsYXNzPVxcXCJwYXJ0bmVyc19fdGl0bGVcXFwiPlNpbHZlcjwvaDQ+XFxyXFxuXFxyXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJwYXJ0bmVyc19fbG9nb3NcXFwiPlxcclxcbiAgICAgICAgICAgIDxpbWcgc3JjPVxcXCJcIiArIHJlcXVpcmUoXCIuL2ltZy9sb2dvLWhxc29mdHdhcmUucG5nXCIpICsgXCJcXFwiIGFsdD1cXFwiXFxcIj5cXHJcXG4gICAgICAgICAgICA8aW1nIHNyYz1cXFwiXCIgKyByZXF1aXJlKFwiLi9pbWcvbG9nby1veGFnaWxlLnBuZ1wiKSArIFwiXFxcIiBhbHQ9XFxcIlxcXCI+XFxyXFxuICAgICAgICAgICAgPGltZyBzcmM9XFxcIlwiICsgcmVxdWlyZShcIi4vaW1nL2xvZ28tYXBhbG9uLnBuZ1wiKSArIFwiXFxcIiBhbHQ9XFxcIlxcXCI+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgPC9kaXY+XFxyXFxuXFxyXFxuICAgIDxkaXYgY2xhc3M9XFxcImJyb256ZSBwYXJ0bmVyc1xcXCI+XFxyXFxuXFxyXFxuICAgICAgICA8aDQgY2xhc3M9XFxcInBhcnRuZXJzX190aXRsZVxcXCI+QnJvbnplPC9oND5cXHJcXG5cXHJcXG5cXHJcXG5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcInBhcnRuZXJzX19sb2dvc1xcXCI+XFxyXFxuICAgICAgICAgICAgPGltZyBzcmM9XFxcIlwiICsgcmVxdWlyZShcIi4vaW1nL2xvZ28tbmlrb2Zpcm0ucG5nXCIpICsgXCJcXFwiIGFsdD1cXFwiXFxcIj5cXHJcXG4gICAgICAgIDwvZGl2PlxcclxcblxcclxcbiAgICA8L2Rpdj5cXHJcXG48L3NlY3Rpb24+XCI7IiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiaW1nL3Bob3RvMS5qcGdcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJpbWcvcGhvdG8yLmpwZ1wiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImltZy9waG90bzMuanBlZ1wiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImltZy9waG90bzQuanBnXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiaW1nL3Bob3RvNS5wbmdcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJpbWcvcGhvdG82LmpwZWdcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJpbWcvcGhvdG83LmpwZ1wiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImltZy9waG90bzguanBnXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiaW1nL3Bob3RvOS5qcGdcIjsiLCIvL2ltcG9ydCAnLi9waG90b3Muc2Nzcyc7XHJcblxyXG5pbXBvcnQgdHh0IGZyb20gJy4vcGhvdG9zLmh0bWwnO1xyXG5cclxuY29uc3QgUGhvdG9zID0ge307XHJcblxyXG4vL2ltcG9ydCBGb290ZXIgZnJvbSAnLi9jb21wJztcclxuXHJcblBob3Rvcy5odG1sID0gdHh0O1xyXG5cclxuZXhwb3J0IHsgUGhvdG9zIH0iLCJtb2R1bGUuZXhwb3J0cyA9IFwiPHNlY3Rpb24gY2xhc3M9XFxcInNlY3Rpb24tcGhvdG9zXFxcIj5cXHJcXG4gICAgPGgyIGlkPSdwaG90b3MnPlNFRSBIT1cgSVQgV0FTPC9oMj5cXHJcXG4gICAgPGRpdiBjbGFzcz1cXFwicGhvdG9zLWdyaWRcXFwiPlxcclxcbiAgICAgICAgPGltZyBzcmM9XFxcIlwiICsgcmVxdWlyZShcIi4vaW1nL3Bob3RvMS5qcGdcIikgKyBcIlxcXCIgYWx0PVxcXCJcXFwiIGNsYXNzPVxcXCJwaG90b3MtZ3JpZF9fcGhvdG8xIHBob3Rvcy1ncmlkX19waG90by0td2lkdGhcXFwiPlxcclxcbiAgICAgICAgPGltZyBzcmM9XFxcIlwiICsgcmVxdWlyZShcIi4vaW1nL3Bob3RvMi5qcGdcIikgKyBcIlxcXCIgYWx0PVxcXCJcXFwiIGNsYXNzPVxcXCJwaG90b3MtZ3JpZF9fcGhvdG8yIHBob3Rvcy1ncmlkX19waG90by0td2lkdGhcXFwiPlxcclxcbiAgICAgICAgPGltZyBzcmM9XFxcIlwiICsgcmVxdWlyZShcIi4vaW1nL3Bob3RvMy5qcGVnXCIpICsgXCJcXFwiIGFsdD1cXFwiXFxcIiBjbGFzcz1cXFwicGhvdG9zLWdyaWRfX3Bob3RvMyBwaG90b3MtZ3JpZF9fcGhvdG8tLXdpZHRoXFxcIj5cXHJcXG4gICAgICAgIDxpbWcgc3JjPVxcXCJcIiArIHJlcXVpcmUoXCIuL2ltZy9waG90bzQuanBnXCIpICsgXCJcXFwiIGFsdD1cXFwiXFxcIiBjbGFzcz1cXFwicGhvdG9zLWdyaWRfX3Bob3RvNCBwaG90b3MtZ3JpZF9fcGhvdG8tLXdpZHRoXFxcIj5cXHJcXG4gICAgICAgIDxpbWcgc3JjPVxcXCJcIiArIHJlcXVpcmUoXCIuL2ltZy9waG90bzUucG5nXCIpICsgXCJcXFwiIGFsdD1cXFwiXFxcIiBjbGFzcz1cXFwicGhvdG9zLWdyaWRfX3Bob3RvNSBwaG90b3MtZ3JpZF9fcGhvdG8tLXdpZHRoXFxcIj5cXHJcXG4gICAgICAgIDxpbWcgc3JjPVxcXCJcIiArIHJlcXVpcmUoXCIuL2ltZy9waG90bzYuanBlZ1wiKSArIFwiXFxcIiBhbHQ9XFxcIlxcXCIgY2xhc3M9XFxcInBob3Rvcy1ncmlkX19waG90bzYgcGhvdG9zLWdyaWRfX3Bob3RvLS13aWR0aFxcXCI+XFxyXFxuICAgICAgICA8aW1nIHNyYz1cXFwiXCIgKyByZXF1aXJlKFwiLi9pbWcvcGhvdG83LmpwZ1wiKSArIFwiXFxcIiBhbHQ9XFxcIlxcXCIgY2xhc3M9XFxcInBob3Rvcy1ncmlkX19waG90bzcgcGhvdG9zLWdyaWRfX3Bob3RvLS13aWR0aFxcXCI+XFxyXFxuICAgICAgICA8aW1nIHNyYz1cXFwiXCIgKyByZXF1aXJlKFwiLi9pbWcvcGhvdG84LmpwZ1wiKSArIFwiXFxcIiBhbHQ9XFxcIlxcXCIgY2xhc3M9XFxcInBob3Rvcy1ncmlkX19waG90bzggcGhvdG9zLWdyaWRfX3Bob3RvLS13aWR0aFxcXCI+XFxyXFxuICAgICAgICA8aW1nIHNyYz1cXFwiXCIgKyByZXF1aXJlKFwiLi9pbWcvcGhvdG85LmpwZ1wiKSArIFwiXFxcIiBhbHQ9XFxcIlxcXCIgY2xhc3M9XFxcInBob3Rvcy1ncmlkX19waG90bzkgcGhvdG9zLWdyaWRfX3Bob3RvLS13aWR0aFxcXCI+XFxyXFxuICAgIDwvZGl2PlxcclxcbiAgICA8YnV0dG9uPlxcclxcbiAgICAgICAgPGEgaHJlZj1cXFwiXFxcIj5TZWUgYWxsIHBob3RvczwvYT5cXHJcXG4gICAgPC9idXR0b24+XFxyXFxuXFxyXFxuPC9zZWN0aW9uPlwiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImltZy9zcGVha2VyMS5qcGdcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJpbWcvc3BlYWtlcjIuanBnXCI7IiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiaW1nL3NwZWFrZXIzLmpwZ1wiOyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX3B1YmxpY19wYXRoX18gKyBcImltZy9zcGVha2VyNC5qcGdcIjsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCJpbWcvc3BlYWtlcjUuanBnXCI7IiwiLy9pbXBvcnQgJy4vc3BlYWtlcnMuc2Nzcyc7XHJcblxyXG5pbXBvcnQgdHh0IGZyb20gJy4vc3BlYWtlcnMuaHRtbCc7XHJcblxyXG5jb25zdCBTcGVha2VycyA9IHt9O1xyXG5cclxuLy9pbXBvcnQgRm9vdGVyIGZyb20gJy4vY29tcCc7XHJcblxyXG5TcGVha2Vycy5odG1sID0gdHh0O1xyXG5cclxuZXhwb3J0IHsgU3BlYWtlcnMgfSIsIm1vZHVsZS5leHBvcnRzID0gXCI8c2VjdGlvbiBjbGFzcz1cXFwic2VjdGlvbi1zcGVha2Vyc1xcXCI+XFxyXFxuICAgIDxoMiBpZD0nc3BlYWtlcnMnPlNwZWFrZXJzPC9oMj5cXHJcXG5cXHJcXG4gICAgPGRpdiBjbGFzcz1cXFwic3BlYWtlcnMtZ3JpZFxcXCI+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJzcGVha2VyXFxcIj5cXHJcXG4gICAgICAgICAgICA8aW1nIHNyYz1cXFwiXCIgKyByZXF1aXJlKFwiLi9pbWcvc3BlYWtlcjEuanBnXCIpICsgXCJcXFwiIGFsdD1cXFwiXFxcIiBjbGFzcz0nc3BlYWtlcl9fcGhvdG8nPlxcclxcbiAgICAgICAgICAgIDxhIGhyZWY9XFxcIlxcXCIgY2xhc3M9J3NwZWFrZXJfX25hbWUnPk1hcms8L2E+XFxyXFxuICAgICAgICAgICAgPHAgY2xhc3M9XFxcInNwZWFrZXJfX29yaWdpblxcXCI+VVNBPC9wPlxcclxcbiAgICAgICAgPC9kaXY+XFxyXFxuXFxyXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJzcGVha2VyXFxcIj5cXHJcXG4gICAgICAgICAgICA8aW1nIHNyYz1cXFwiXCIgKyByZXF1aXJlKFwiLi9pbWcvc3BlYWtlcjIuanBnXCIpICsgXCJcXFwiIGFsdD1cXFwiXFxcIiBjbGFzcz0nc3BlYWtlcl9fcGhvdG8nPlxcclxcbiAgICAgICAgICAgIDxhIGhyZWY9XFxcIlxcXCIgY2xhc3M9J3NwZWFrZXJfX25hbWUnPkxhZHkgR2FnYTwvYT5cXHJcXG4gICAgICAgICAgICA8cCBjbGFzcz1cXFwic3BlYWtlcl9fb3JpZ2luXFxcIj5VU0E8L3A+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcInNwZWFrZXJcXFwiPlxcclxcbiAgICAgICAgICAgIDxpbWcgc3JjPVxcXCJcIiArIHJlcXVpcmUoXCIuL2ltZy9zcGVha2VyMy5qcGdcIikgKyBcIlxcXCIgYWx0PVxcXCJcXFwiIGNsYXNzPSdzcGVha2VyX19waG90byc+XFxyXFxuICAgICAgICAgICAgPGEgaHJlZj1cXFwiXFxcIiBjbGFzcz0nc3BlYWtlcl9fbmFtZSc+U29tZSBidWRkeTwvYT5cXHJcXG4gICAgICAgICAgICA8cCBjbGFzcz1cXFwic3BlYWtlcl9fb3JpZ2luXFxcIj5VU0E8L3A+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcInNwZWFrZXJcXFwiPlxcclxcbiAgICAgICAgICAgIDxpbWcgc3JjPVxcXCJcIiArIHJlcXVpcmUoXCIuL2ltZy9zcGVha2VyNC5qcGdcIikgKyBcIlxcXCIgYWx0PVxcXCJcXFwiIGNsYXNzPSdzcGVha2VyX19waG90byc+XFxyXFxuICAgICAgICAgICAgPGEgaHJlZj1cXFwiXFxcIiBjbGFzcz0nc3BlYWtlcl9fbmFtZSc+U29tZSBidWRkeTwvYT5cXHJcXG4gICAgICAgICAgICA8cCBjbGFzcz1cXFwic3BlYWtlcl9fb3JpZ2luXFxcIj5Db3VudHJ5PC9wPlxcclxcbiAgICAgICAgPC9kaXY+XFxyXFxuXFxyXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJzcGVha2VyXFxcIj5cXHJcXG4gICAgICAgICAgICA8aW1nIHNyYz1cXFwiXCIgKyByZXF1aXJlKFwiLi9pbWcvc3BlYWtlcjUuanBnXCIpICsgXCJcXFwiIGFsdD1cXFwiXFxcIiBjbGFzcz0nc3BlYWtlcl9fcGhvdG8nPlxcclxcbiAgICAgICAgICAgIDxhIGhyZWY9XFxcIlxcXCIgY2xhc3M9J3NwZWFrZXJfX25hbWUnPk5hbWU8L2E+XFxyXFxuICAgICAgICAgICAgPHAgY2xhc3M9XFxcInNwZWFrZXJfX29yaWdpblxcXCI+Q291bnRyeTwvcD5cXHJcXG4gICAgICAgIDwvZGl2PlxcclxcblxcclxcbiAgICA8L2Rpdj5cXHJcXG5cXHJcXG5cXHJcXG48L3NlY3Rpb24+XCI7IiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW4iXSwic291cmNlUm9vdCI6IiJ9